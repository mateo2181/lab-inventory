'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

// module.exports = {};

module.exports = {
    // findOne: async ctx => {
    //   // const id = ctx.params.id;
    //   const { id } = ctx.params;
    //   return id;
    // },
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.reactivos.create(data, { files });
        } else {
          const bulk = ctx.request.body.count ? ctx.request.body.count : 1;
          entity = null;
          for (const it of Array(bulk)) {
              entity = await strapi.services.reactivos.create(ctx.request.body);              
          }
        }
        return sanitizeEntity(entity, { model: strapi.models.reactivos });
      }
  };