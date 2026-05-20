import { Response, NextFunction } from 'express';
import { stringify } from 'csv-stringify/sync';
import { AuthRequest, LeadQueryParams } from '../types';
import * as LeadService from '../services/lead.service';
import {
  sendSuccess,
  sendCreated,
  sendError,
} from '../utils/apiResponse';

export const getLeads = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const params: LeadQueryParams = req.query as LeadQueryParams;
    const result = await LeadService.getLeads(params, req.user);

    sendSuccess(res, result, 'Leads retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const lead = await LeadService.getLeadById(req.params.id, req.user);
    sendSuccess(res, lead, 'Lead retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const createLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const lead = await LeadService.createLead(req.body, req.user.id);
    sendCreated(res, lead, 'Lead created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const lead = await LeadService.updateLead(
      req.params.id,
      req.body,
      req.user
    );
    sendSuccess(res, lead, 'Lead updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    await LeadService.deleteLead(req.params.id, req.user);
    sendSuccess(res, null, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCSV = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const params = req.query as Omit<LeadQueryParams, 'page' | 'limit'>;
    const leads = await LeadService.exportLeadsAsCSV(params, req.user);

    const csvData = leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Status: lead.status,
      Source: lead.source,
      Notes: lead.notes || '',
      'Created At': new Date(lead.createdAt).toISOString(),
    }));

    const csv = stringify(csvData, { header: true });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="leads-${Date.now()}.csv"`
    );
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

export const getLeadStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) throw new Error('Not authenticated');

    const stats = await LeadService.getLeadStats(req.user);
    sendSuccess(res, stats, 'Lead stats retrieved');
  } catch (error) {
    next(error);
  }
};
