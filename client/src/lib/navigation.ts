export let navigate = () => {};

export const setNavigate = (fn: any) => {
  navigate = fn;
};
