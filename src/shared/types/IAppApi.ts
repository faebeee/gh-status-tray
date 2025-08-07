import { AppController } from '../../main/src/controller/AppController'

export type IAppApi = {
  checkWorkflow: AppController['checkWorkflow']
  addWorkflow: AppController['addWorkflow']
  removeWorkflow: AppController['removeWorkflow']
}
