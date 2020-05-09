import {
  registerGlobalServices,
  serviceManager,
} from "shared/services/manager";

export const registerServices = (options) => {
  registerGlobalServices(options);
};

export { serviceManager };
