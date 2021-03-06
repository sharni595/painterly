const Painting = require('./Painting');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Painting, {
    foreignKey:'user_id'
});

Painting.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Painting, {
    foreignKey: 'painting_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Painting.hasMany(Comment, {
    foreignKey: 'painting_id'
});

module.exports = { User, Painting, Comment };
