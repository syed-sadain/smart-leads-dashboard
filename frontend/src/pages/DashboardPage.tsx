import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  TrendingUp,
  PhoneCall,
} from 'lucide-react';

import { leadService } from '@/services/leadService';
import { LeadStats, LeadStatus } from '@/types';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

import { toast } from 'react-hot-toast';

const DashboardPage = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<LeadStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await leadService.getLeadStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusCount = (status: LeadStatus): number => {
    return (
      stats?.statusStats.find((s) => s._id === status)?.count || 0
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Overview of your leads
            </p>
          </div>

          <Button onClick={() => navigate('/leads')}>
            View All Leads
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value={stats?.total || 0}
            icon={CheckCircle}
            color="blue"
          />

          <StatsCard
            title="New Leads"
            value={getStatusCount(LeadStatus.NEW)}
            icon={TrendingUp}
            color="green"
          />

          <StatsCard
            title="Contacted"
            value={getStatusCount(LeadStatus.CONTACTED)}
            icon={PhoneCall}
            color="yellow"
          />

          <StatsCard
            title="Qualified"
            value={getStatusCount(LeadStatus.QUALIFIED)}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => navigate('/leads?status=New')}
              variant="secondary"
              className="justify-start"
            >
              View New Leads ({getStatusCount(LeadStatus.NEW)})
            </Button>

            <Button
              onClick={() => navigate('/leads?status=Contacted')}
              variant="secondary"
              className="justify-start"
            >
              Follow Up Contacted (
              {getStatusCount(LeadStatus.CONTACTED)})
            </Button>

            <Button
              onClick={() => navigate('/leads')}
              variant="secondary"
              className="justify-start"
            >
              Manage All Leads
            </Button>

            <Button
              onClick={() => navigate('/leads')}
              variant="primary"
              className="justify-start"
            >
              Add New Lead
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;