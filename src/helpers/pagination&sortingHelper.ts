type T_queryParams = {
  page?: string;
  limit?: string;
  sortby?: string;
  sortorder?: string;
};

type T_queryParamsReturn = {
  page: number;
  limit: number;
  skip: number;
  sortby: string;
  sortorder: string;
};

const pagination_sorting_Helper = (
  queryParams: T_queryParams,
): T_queryParamsReturn => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 5;
  const skip = (page - 1) * limit;

  const sortby = queryParams.sortby || "created_At";
  const sortorder = queryParams.sortorder || "desc";

  return { page, limit, skip, sortby, sortorder };
};

export default pagination_sorting_Helper;
