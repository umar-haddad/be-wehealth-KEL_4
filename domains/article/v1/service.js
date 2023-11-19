const repository = require('./repository');
const errorHelper = require('../../../utils/error');
const fileHelper = require('../../../utils/fileHelper');

/**
 * Get List Article
 * @param {Object} query values for filtering needs
 */
const index = async (query) => {
  // get data
  return await repository.list(query);
};

/**
 * Get Detail article
 * @param {String} id
 */
const detail = async (id) => {
  const article = await repository.findById(id);
  if (!article) errorHelper.throwNotFound('Article Not Found');
  return {
    article: article,
  };
};

/**
 * Create One Article
 * @param {Object} body
 * @param {Object} file
 */
const createOne = async (body, file) => {
  // create article
  let createdArticle = await repository.save(body, file);
  if (!createdArticle)
    errorHelper.throwInternalServerError('Create Article Failed');

  return {
    article: createdArticle,
  };
};

/**
 * Update One article
 * @param {String} id
 * @param {Object} body
 */
const updateOne = async (id, body) => {
  const article = await repository.findById(id);
  if (!article) errorHelper.throwNotFound('Article Not Found');

  // update user
  let updatedArticle = await repository.updateOne(id, body);
  if (!updatedArticle)
    errorHelper.throwInternalServerError('Update Article Failed');

  return {
    user: updatedArticle,
  };
};

/**
 * Delete One Article
 * @param {String} id
 */
const deleteOne = async (id) => {
  const article = await repository.findById(id);
  if (!article) errorHelper.throwNotFound('Article Not Found');

  // delete user
  let deletedArticle = await repository.deleteOne(id);
  if (!deletedArticle)
    errorHelper.throwInternalServerError('Delete Article Failed');

  return true;
};

module.exports = {
  index,
  detail,
  updateOne,
  deleteOne,
  createOne,
};
