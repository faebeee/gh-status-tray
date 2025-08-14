import { IAppApi } from '@shared/types/IAppApi'

declare global {
  interface Window {
    app: IAppApi
  }
}
