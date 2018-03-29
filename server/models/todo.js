const mongoose = require('mongoose');

// Define Schemes
const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
},
  {
    timestamps: true
  });

// Create new todo document
// Statics model methods(Statics): Schema의 statics 프로퍼티에 사용자 정의 메소드를 추가한다.
todoSchema.statics.create = function (payload) {
  // this === Model Todo
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  // return this.find({});
  return this.find({}, { _id: false, id: true, content: true, completed: true }).sort({ id: 'desc' });
};

// Find One by todoid
// todoSchema.statics.findOneByTodoid = function (id) {
//   return this.findOne({ id });
// };

// Update All
todoSchema.statics.updateAll = function (payload) {
  return this.update({}, payload, { multi: true });
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (id, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ id }, payload, { new: true });
};

// Delete All
// todoSchema.statics.deleteAll = function () {
//   return this.remove({});
// };

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (id) {
  return this.remove({ id });
};

// Delete by completed
todoSchema.statics.deleteByCompleted = function () {
  return this.remove({ completed: true });
};

// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);