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

/* =========================================================
   Protected Routes
========================================================= */

// All routes below require login
router.use(authenticate);

/* =========================================================
   Lead Statistics & Export
========================================================= */

router.get(
  '/stats',
  salesOrAdmin,
  LeadController.getLeadStats
);

router.get(
  '/export/csv',
  salesOrAdmin,
  LeadController.exportLeadsCSV
);

/* =========================================================
   Get All Leads & Create Lead
========================================================= */

router
  .route('/')

  // GET /api/v1/leads
  .get(
    salesOrAdmin,
    leadsQueryValidator,
    validate,
    LeadController.getLeads
  )

  // POST /api/v1/leads
  .post(
    salesOrAdmin,
    createLeadValidator,
    validate,
    LeadController.createLead
  );

/* =========================================================
   Single Lead Routes
========================================================= */

router
  .route('/:id')

  // GET /api/v1/leads/:id
  .get(
    salesOrAdmin,
    LeadController.getLeadById
  )

  // PATCH /api/v1/leads/:id
  .patch(
    salesOrAdmin,
    updateLeadValidator,
    validate,
    LeadController.updateLead
  )

  // DELETE /api/v1/leads/:id
  .delete(
    salesOrAdmin,
    LeadController.deleteLead
  );

export default router;