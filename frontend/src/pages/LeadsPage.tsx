import { useEffect, useState } from 'react';
import { Plus, Download, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { leadService } from '@/services/leadService';

import {
  Lead,
  LeadFilters as LeadFiltersType,
  SortOrder,
  CreateLeadInput,
  UpdateLeadInput,
} from '@/types';

import { useDebounce } from '@/hooks/useDebounce';
import { downloadCSV } from '@/utils/downloadCSV';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadTable from '@/components/leads/LeadTable';
import LeadForm from '@/components/leads/LeadForm';
import LeadDetails from '@/components/leads/LeadDetails';
import Pagination from '@/components/leads/Pagination';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const [filters, setFilters] = useState<Partial<LeadFiltersType>>({
    page: 1,
    limit: 10,
    sort: SortOrder.LATEST,
    search: '',
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useDebounce(filters.search || '', 500);

  useEffect(() => {
    loadLeads();
  }, [
    filters.page,
    filters.status,
    filters.source,
    filters.sort,
    debouncedSearch,
  ]);

  const loadLeads = async () => {
    setIsLoading(true);

    try {
      const data = await leadService.getLeads({
        ...filters,
        search: debouncedSearch,
      });

      setLeads(data.data);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to load leads');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      page: key !== 'page' ? 1 : prev.page,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      sort: SortOrder.LATEST,
      search: '',
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleCreateLead = async (data: CreateLeadInput) => {
    setIsSubmitting(true);

    try {
      await leadService.createLead(data);

      toast.success('Lead created successfully');

      setShowCreateModal(false);

      loadLeads();
    } catch (error) {
      toast.error('Failed to create lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateLead = async (data: UpdateLeadInput) => {
    if (!selectedLead) return;

    setIsSubmitting(true);

    try {
      await leadService.updateLead(selectedLead._id, data);

      toast.success('Lead updated successfully');

      setShowEditModal(false);
      setSelectedLead(null);

      loadLeads();
    } catch (error) {
      toast.error('Failed to update lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!selectedLead) return;

    setIsSubmitting(true);

    try {
      await leadService.deleteLead(selectedLead._id);

      toast.success('Lead deleted successfully');

      setShowDeleteModal(false);
      setSelectedLead(null);

      loadLeads();
    } catch (error) {
      toast.error('Failed to delete lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);

    try {
      const blob = await leadService.exportLeadsCSV({
        status: filters.status,
        source: filters.source,
        search: debouncedSearch,
      });

      downloadCSV(blob, `leads-${Date.now()}.csv`);

      toast.success('Leads exported successfully');
    } catch (error) {
      toast.error('Failed to export leads');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Leads Management
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track your leads
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleExportCSV}
              variant="secondary"
              isLoading={isExporting}
              className="flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </Button>

            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Filters */}
        <LeadFilters
          filters={{
            status: filters.status,
            source: filters.source,
            search: filters.search || '',
            sort: filters.sort || SortOrder.LATEST,
          }}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Table */}
        <Card>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : leads.length === 0 ? (
            <EmptyState
              icon={<Users size={48} />}
              title="No leads found"
              description="Get started by creating your first lead"
              action={
                <Button onClick={() => setShowCreateModal(true)}>
                  Create Lead
                </Button>
              }
            />
          ) : (
            <>
              <LeadTable
                leads={leads}
                onView={(lead) => {
                  setSelectedLead(lead);
                  setShowViewModal(true);
                }}
                onEdit={(lead) => {
                  setSelectedLead(lead);
                  setShowEditModal(true);
                }}
                onDelete={(lead) => {
                  setSelectedLead(lead);
                  setShowDeleteModal(true);
                }}
              />

              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Card>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Lead"
        size="lg"
      >
        <LeadForm
          onSubmit={(data: CreateLeadInput | UpdateLeadInput) =>
            handleCreateLead(data as CreateLeadInput)
          }
          isLoading={isSubmitting}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedLead(null);
        }}
        title="Edit Lead"
        size="lg"
      >
        <LeadForm
          initialData={
            selectedLead
              ? {
                  ...selectedLead,
                  assignedTo:
                    typeof selectedLead.assignedTo === 'object'
                      ? selectedLead.assignedTo?._id
                      : selectedLead.assignedTo,
                }
              : undefined
          }
          onSubmit={(data: CreateLeadInput | UpdateLeadInput) =>
            handleUpdateLead(data as UpdateLeadInput)
          }
          isLoading={isSubmitting}
          isEdit
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedLead(null);
        }}
        title="Lead Details"
        size="lg"
      >
        {selectedLead && <LeadDetails lead={selectedLead} />}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedLead(null);
        }}
        title="Delete Lead"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this lead?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedLead(null);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleDeleteLead}
              isLoading={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default LeadsPage;