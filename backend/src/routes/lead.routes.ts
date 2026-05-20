import { Router } from 'express';
import * as LeadController from '../controllers/lead.controller';
import { authenticate, salesOrAdmin } from '../middleware/auth';
import {
  createLeadValidator,
  updateLeadValidator,
  leadsQueryValidator,
} from '../validators/lead.validators';
import { validate } from '../middleware/validate';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/stats', salesOrAdmin, LeadController.getLeadStats);
router.get('/export/csv', salesOrAdmin, LeadController.exportLeadsCSV);

router
  .route('/')
  .get(salesOrAdmin, leadsQueryValidator, validate, LeadController.getLeads)
  .post(
    salesOrAdmin,
    createLeadValidator,
    validate,
    LeadController.createLead
  );

router
  .route('/:id')
  .get(salesOrAdmin, LeadController.getLeadById)
  .patch(
    salesOrAdmin,
    updateLeadValidator,
    validate,
    LeadController.updateLead
  )
  .delete(salesOrAdmin, LeadController.deleteLead);

export default router;
