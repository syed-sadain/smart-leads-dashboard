import { FilterQuery } from 'mongoose';
import { Lead, ILeadDocument } from '../models/Lead';
import { AppError } from '../middleware/errorHandler';
import {
  LeadQueryParams,
  LeadStatus,
  LeadSource,
  SortOrder,
  PaginatedResponse,
  UserRole,
  IUserPayload,
} from '../types';

const DEFAULT_LIMIT = 10;

interface CreateLeadData {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  notes?: string;
  assignedTo?: string;
}

interface UpdateLeadData {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
  notes?: string;
  assignedTo?: string;
}

const buildFilterQuery = (
  params: LeadQueryParams,
  user: IUserPayload
): FilterQuery<ILeadDocument> => {
  const filter: FilterQuery<ILeadDocument> = {};

  // Sales users can only see their own leads
  if (user.role === UserRole.SALES) {
    filter.createdBy = user.id;
  }

  if (params.status) filter.status = params.status;
  if (params.source) filter.source = params.source;

  if (params.search) {
    const searchRegex = new RegExp(params.search, 'i');
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  return filter;
};

export const getLeads = async (
  params: LeadQueryParams,
  user: IUserPayload
): Promise<PaginatedResponse<ILeadDocument>> => {
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(params.limit || String(DEFAULT_LIMIT), 10))
  );
  const skip = (page - 1) * limit;

  const filter = buildFilterQuery(params, user);
  const sortOrder = params.sort === SortOrder.OLDEST ? 1 : -1;

  const [leads, totalRecords] = await Promise.all([
    Lead.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalRecords / limit);

  return {
    data: leads as unknown as ILeadDocument[],
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getLeadById = async (
  id: string,
  user: IUserPayload
): Promise<ILeadDocument> => {
  const lead = await Lead.findById(id)
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');

  if (!lead) throw new AppError('Lead not found', 404);

  if (
    user.role === UserRole.SALES &&
    lead.createdBy.toString() !== user.id
  ) {
    throw new AppError('Not authorized to view this lead', 403);
  }

  return lead;
};

export const createLead = async (
  data: CreateLeadData,
  userId: string
): Promise<ILeadDocument> => {
  const lead = await Lead.create({
    ...data,
    createdBy: userId,
  });
  return lead;
};

export const updateLead = async (
  id: string,
  data: UpdateLeadData,
  user: IUserPayload
): Promise<ILeadDocument> => {
  const lead = await Lead.findById(id);
  if (!lead) throw new AppError('Lead not found', 404);

  if (user.role === UserRole.SALES && lead.createdBy.toString() !== user.id) {
    throw new AppError('Not authorized to update this lead', 403);
  }

  const updated = await Lead.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');

  if (!updated) throw new AppError('Lead not found', 404);
  return updated;
};

export const deleteLead = async (
  id: string,
  user: IUserPayload
): Promise<void> => {
  const lead = await Lead.findById(id);
  if (!lead) throw new AppError('Lead not found', 404);

  if (user.role === UserRole.SALES && lead.createdBy.toString() !== user.id) {
    throw new AppError('Not authorized to delete this lead', 403);
  }

  await Lead.findByIdAndDelete(id);
};

export const exportLeadsAsCSV = async (
  params: Omit<LeadQueryParams, 'page' | 'limit'>,
  user: IUserPayload
): Promise<ILeadDocument[]> => {
  const filter = buildFilterQuery(params, user);
  const leads = await Lead.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(10000) // safety cap
    .lean();
  return leads as unknown as ILeadDocument[];
};

export const getLeadStats = async (user: IUserPayload) => {
  const matchStage =
    user.role === UserRole.SALES ? { createdBy: user.id } : {};

  const [statusStats, sourceStats, total] = await Promise.all([
    Lead.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    Lead.aggregate([
      { $match: matchStage },
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]),
    Lead.countDocuments(matchStage),
  ]);

  return { statusStats, sourceStats, total };
};
