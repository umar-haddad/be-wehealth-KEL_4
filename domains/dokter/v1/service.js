const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const fileHelper = require('../../../utils/fileHelper');

/**
 * Get List dokter
 * @param {Object} query values for filtering needs
 */
const index = async (query) => {
  // get data
  return await repository.list(query);
};

/**
 * Get Detail dokter
 * @param {String} id
 */
const detail = async (id) => {
  const dokter = await repository.findById(id);
  if (!dokter) errorHelper.throwNotFound('dokter Not Found');
  return {
    dokter: dokter,
  };
};

/**
 * Create One dokter
 * @param {Object} body
 * @param {Object} file
 */
const createOne = async (body, file) => {
  // create dokter
  let createddokter = await repository.save(body, file);
  if (!createddokter)
    errorHelper.throwInternalServerError('Create dokter Failed');

  return {
    dokter: createddokter,
  };
};

/**
 * Update One dokter
 * @param {String} id
 * @param {Object} body
 */
const updateOne = async (id, body, file) => {
  const dokter = await repository.findById(id);
  if (!dokter) errorHelper.throwNotFound('dokter Not Found');

  // update user
  let updateddokter = await repository.updateOne(id, body, file);
  if (!updateddokter)
    errorHelper.throwInternalServerError('Update dokter Failed');

  return {
    user: updateddokter,
  };
};

/**
 * Delete One dokter
 * @param {String} id
 */
const deleteOne = async (id) => {
  const dokter = await repository.findById(id);
  if (!dokter) errorHelper.throwNotFound('dokter Not Found');

  // delete user
  let deleteddokter = await repository.deleteOne(id);
  if (!deleteddokter)
    errorHelper.throwInternalServerError('Delete dokter Failed');

  return true;
};

module.exports = {
  index,
  detail,
  updateOne,
  deleteOne,
  createOne,
};
