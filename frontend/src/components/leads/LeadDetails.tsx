import { Lead } from '@/types';
import { formatDateTime } from '@/utils/formatDate';
import Badge from '../ui/Badge';

interface LeadDetailsProps {
  lead: Lead;
}

const LeadDetails = ({ lead }: LeadDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Name
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white">{lead.name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Email
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white">{lead.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Status
          </label>
          <div className="mt-1">
            <Badge status={lead.status}>{lead.status}</Badge>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Source
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white">{lead.source}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Created At
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white">
            {formatDateTime(lead.createdAt)}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Created By
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white">
            {lead.createdBy?.name || 'Unknown'}
          </p>
        </div>
      </div>

      {lead.notes && (
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Notes
          </label>
          <p className="mt-1 text-base text-gray-900 dark:text-white whitespace-pre-wrap">
            {lead.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadDetails;
