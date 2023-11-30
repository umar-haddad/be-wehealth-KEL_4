const { Dokter } = require('../dokter');
const { User } = require('../../user/user');
const mongoQuery = require('../../../utils/mongoQuery');
const fileHelper = require('../../../utils/fileHelper');

/**
 * Get List Data
 * @param {Object} params
 */
const list = async (params) => {
  // init aggregate pipelines
  let pipelines = [];

  // init filters
  let filters = [];

  // filter : status
  if (params.category) {
    filters.push({ category: params.category });
  }

  // filter : search
  if (params.search && params.search !== '') {
    filters.push({
      $or: [
        { first_name: mongoQuery.searchLike(params.search) },
        { last_name: mongoQuery.searchLike(params.search) },
      ],
    });
  }

  // assign filters to pipelines
  if (filters.length > 0) {
    pipelines.push({ $match: { $and: filters } });
  }

  // sort
  pipelines.push({
    $sort: mongoQuery.getSort(
      params.sort_by,
      'created.at',
      params.sort_dir,
      'desc'
    ),
  });

  // get total dokter
  let total = await Dokter.countDocuments();

  // get total filtered
  let totalFiltered = 0;
  let totalFilteredPipeline = [];
  totalFilteredPipeline.push(...pipelines);
  totalFilteredPipeline.push({ $count: 'total' });
  let resTotalFiltered = await Dokter.aggregate(totalFilteredPipeline);
  if (resTotalFiltered && resTotalFiltered.length > 0) {
    totalFiltered = resTotalFiltered[0].total;
  }

  // pagination
  if (params.page && params.limit) {
    let pageVal = parseInt(params.page);
    let limitVal = parseInt(params.limit);
    let skip = (pageVal - 1) * limitVal;
    pipelines.push({ $limit: skip + limitVal }, { $skip: skip });
  }

  // get data
  const data = await Dokter.aggregate(pipelines);

  // populate user
  let userIds = [];
  data.forEach((item) => {
    userIds.push(item.user);
  });

  // return
  return {
    data: data,
    meta: {
      page: params.page,
      limit: params.limit,
      total: total,
      total_filtered: totalFiltered,
    },
  };
};

/**
 * Find By ID
 * @param {String} id
 */
const findById = async (id) => {
  return Dokter.findOne({ _id: id }).populate('user');
};

/**
 * Create New Data
 * @param {Object} data
 * @param {Object} file
 */
/*
 email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
*/

const save = async (data, file) => {
  // upload file
  if (file) {
    let uploadedFile = await fileHelper.upload(file.buffer);
    if (!uploadedFile)
      errorHelper.throwInternalServerError('Upload File Failed');

    data.image = uploadedFile.secure_url;
  }

  // create user
  let createdUser = await User.create({
    email: data.email,
    password: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
    role: 'doctor',
  });

  let dokter = new Dokter({
    name: data.name,
    category: data.category,
    user: createdUser._id,
    image: data.image,
  });

  return dokter.save();
};

/**
 * Update One Data with filter ID
 * @param {String} id
 * @param {Object} data
 */
const updateOne = async (id, data) => {
  return Dokter.findOneAndUpdate({ _id: id }, data, {
    returnOriginal: false,
  });
};

/**
 * Delete One Data with filter ID
 * @param {String} id
 */
const deleteOne = async (id) => {
  return Dokter.deleteOne({ _id: id });
};

module.exports = {
  list,
  findById,
  save,
  updateOne,
  deleteOne,
};
