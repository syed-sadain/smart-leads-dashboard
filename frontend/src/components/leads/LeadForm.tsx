import { useForm } from 'react-hook-form';
import { LeadStatus, LeadSource, CreateLeadInput, UpdateLeadInput } from '@/types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface LeadFormProps {
  initialData?: UpdateLeadInput & { _id?: string };
  onSubmit: (data: CreateLeadInput | UpdateLeadInput) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

const LeadForm = ({ initialData, onSubmit, isLoading, isEdit }: LeadFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    defaultValues: initialData || {
      name: '',
      email: '',
      status: LeadStatus.NEW,
      source: LeadSource.WEBSITE,
      notes: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name must be at least 2 characters' },
          maxLength: { value: 150, message: 'Name cannot exceed 150 characters' },
        })}
        error={errors.name?.message}
        placeholder="Enter lead name"
      />

      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Please enter a valid email',
          },
        })}
        error={errors.email?.message}
        placeholder="lead@example.com"
      />

      <Select
        label="Status"
        {...register('status')}
        options={[
          { value: LeadStatus.NEW, label: 'New' },
          { value: LeadStatus.CONTACTED, label: 'Contacted' },
          { value: LeadStatus.QUALIFIED, label: 'Qualified' },
          { value: LeadStatus.LOST, label: 'Lost' },
        ]}
      />

      <Select
        label="Source"
        {...register('source', { required: 'Source is required' })}
        error={errors.source?.message}
        options={[
          { value: LeadSource.WEBSITE, label: 'Website' },
          { value: LeadSource.INSTAGRAM, label: 'Instagram' },
          { value: LeadSource.REFERRAL, label: 'Referral' },
        ]}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          {...register('notes', {
            maxLength: { value: 1000, message: 'Notes cannot exceed 1000 characters' },
          })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   dark:bg-gray-800 dark:text-white"
          placeholder="Additional notes about the lead..."
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.notes.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
