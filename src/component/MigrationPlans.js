import React from "react";
import classNames from 'classnames';

import { Button } from "patternfly-react";
import { Icon } from "patternfly-react";
import { MessageDialog } from 'patternfly-react';


import MigrationPlansBase from './MigrationPlansBase';
import MigrationPlansTable from './MigrationPlansTable';
import MigrationPlanListFilter from './MigrationPlanListFilter'
import MigrationPlansEditPopup from './MigrationPlansEditPopup';


import WizardAddPlan from './WizardAddPlan';
import WizardExecuteMigration from './WizardExecuteMigration';

import { AddPlanItems } from './WizardItems';
import { ExecuteMigrationItems } from './WizardItems';

export default class MigrationPlans extends MigrationPlansBase {


    resetAllStates = ()=> {
        //clean all states before open add plan wizard, otherwise the wizard-form might have last add-plan's values and steps
      this.setState({
          showDeleteConfirmation:false,
          showMigrationWizard:false,
          showPlanWizard: false,
          deletePlanId:'',
          runningInstances:[],
          planId:'',
          addPlanResponseJsonStr:''
      });
    };



    closeMigrationWizard = () => {
      this.setState({ showMigrationWizard: false });
      //TODO: this.retriveAllPlans();
    };



    openAddPlanWizard = () => {
      this.resetAllStates();
      this.setState({showPlanWizard: true});
      this.refs.WizardAddPlanChild.resetWizardStates();
    }

    openAddPlanWizardwithInitialData = (rowData) => {
        console.log('openAddPlanWizardwithInitialData name: ' + rowData.name);
      this.resetAllStates();
      this.setState({showPlanWizard: true});
      this.refs.WizardAddPlanChild.initialWizardStates(rowData);
    }


    closeAddPlanWizard = () => {
      this.setState({ showPlanWizard: false });
      this.retriveAllPlans();
    };

    onFilterChange = (planFilter) =>{
        console.log('onFilterChange: ' + planFilter);

        let filteredPlans = this.state.plans
        filteredPlans = filteredPlans.filter((plan) => {
          let sourceContainterId = plan.source_container_id.toLowerCase()
          return sourceContainterId.indexOf(
            planFilter.toLowerCase()) !== -1
        })
        this.setState({
          filteredPlans
        })
    }



  render() {
      const { showPlanWizard, showMigrationWizard } = this.state;

      //for MessageDialogDeleteConfirmation
      const primaryContent = <p className="lead">Please confirm you will delete this migration plan {this.state.deletePlanId}</p>;
      const secondaryContent = <p></p>;
      const icon = <Icon type="pf" name="error-circle-o" />;



    return (
        <div>
              {/* Delete Plan pop-up */}
              <MessageDialog
                show={this.state.showDeleteConfirmation}
                onHide={this.hideDeleteDialog}
                primaryAction={this.deletePlan}
                secondaryAction={this.hideDeleteDialog}
                primaryActionButtonContent="Delete"
                secondaryActionButtonContent="Cancel"
                primaryActionButtonBsStyle="danger"
                title="Delete Migration Plan"
                icon={icon}
                primaryContent={primaryContent}
                secondaryContent={secondaryContent}
                accessibleName="deleteConfirmationDialog"
                accessibleDescription="deleteConfirmationDialogContent"
              />

              {/* import plan & Add Plan */}
            <table border="0" width="100%">
            <tbody>
              <tr>
                <td>
                  <MigrationPlanListFilter onChange={this.onFilterChange} />
                </td>
                <td  align="right">
                  <MigrationPlansEditPopup
                    title="Import Migration Plan"
                    actionName="Import Plan"
                    retrieveAllPlans={this.retrieveAllPlans}
                    updatePlan={this.addPlan}
                  />
                </td>
                <td  align="left">
                  <Button bsStyle="primary" onClick={this.openAddPlanWizard}>
                    Add Plan
                  </Button>
                </td>
              </tr>
             </tbody>
            </table>

            {/* Table lists all the migration plans */}
            <MigrationPlansTable
                openMigrationWizard={this.openMigrationWizard}
                openAddPlanWizard={this.openAddPlanWizard}
                openAddPlanWizardwithInitialData={this.openAddPlanWizardwithInitialData}
                showDeleteDialog={this.showDeleteDialog}
                filteredPlans={this.state.filteredPlans}
                updatePlan={this.editPlan}
                retrieveAllPlans={this.retrieveAllPlans}
            />

            {/* Add Plan Wizard */}
            <WizardAddPlan
                showPlanWizard={showPlanWizard}
                closeAddPlanWizard={this.closeAddPlanWizard}
                addPlan={this.addPlan}
                steps={AddPlanItems}
                ref="WizardAddPlanChild"
                addPlanResponseJsonStr={this.state.addPlanResponseJsonStr}
                useMockData={this.state.useMockData}
            />

        {/* Execute Migration Wizard*/}
          <WizardExecuteMigration
            showMigrationWizard={showMigrationWizard}
            closeMigrationWizard={this.closeMigrationWizard}
            runningInstances={this.state.runningInstances}
            planId={this.state.planId}
            steps={ExecuteMigrationItems}
            ref="WizardExecuteMigrationChild"
            useMockData={this.state.useMockData}
          />

    </div>

    );
  }
}
