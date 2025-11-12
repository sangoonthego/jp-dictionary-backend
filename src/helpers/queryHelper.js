const buildQueryOptions = (queryParams, filterableFields = [], extraFilters = {}) => {
  let { page = 1, limit = 20, sortBy = "kanji", order = "asc", search, ...filters } = queryParams;
  
  page = Math.max(1, Number(page) || 1);
  limit = Math.max(1, Number(limit) || 20);

  // merge extra filters
  filters = { ...filters, ...extraFilters };

  const query = {};

  // numeric & exact filters
  Object.keys(filters).forEach(key => {
    const val = filters[key];
    if (val !== undefined && val !== "") {
      if (key === "minStrokes" || key === "maxStrokes") {
        query.strokes = query.strokes || {};
        if (key === "minStrokes") query.strokes.$gte = Number(val);
        if (key === "maxStrokes") query.strokes.$lte = Number(val);
      } else {
        query[key] = isNaN(val) ? val : Number(val);
      }
    }
  });

  // search
  if (search && filterableFields.length > 0) {
    query.$or = filterableFields.map(field => ({ [field]: { $regex: search, $options: "i" } }));
  }

  const skip = (page - 1) * limit;
  const sortOption = {};
  sortOption[sortBy] = order === "asc" ? 1 : -1;

  return { query, skip, limit, sortOption, page };
};

module.exports = { buildQueryOptions };
