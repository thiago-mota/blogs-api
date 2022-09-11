const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory",
  {
    postId: { 
      primaryKey: true, 
      foreignKey: true,
      type: DataTypes.INTEGER, 
    },
    categoryId: { 
      primaryKey: true,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false },
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  };

  return PostCategory;
};



module.exports = PostCategory;
