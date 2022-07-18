
class ToDoList {
    constructor() {
      this.items = [];
    }
  
    add(text) {
      let item = new Item(text);
      if (this.items.find((obj) => obj.id === item.id)) return this.add(text);
      this.items.push(item);
      return item;
    }
  
    complete(id) {
      let task = this.findIndexById(id);
      return task.complete();
    }
  
    uncomplete(id) {
      let task = this.findIndexById(id);
      return task.uncomplete();
    }
  
    remove(id) {
      let task = this.findIndexById(id);
      let index = this.items.indexOf(task);
      return this.items.splice(index, 1)[0];
    }
  
    getCompHistory(id) {
      let task = this.findIndexById(id);
      return task.getCompHistory();
    }
  
    findIndexById(id) {
      let foundTask = this.items.filter((task) => task.id === id);
      return foundTask[0];
    }
  
    update(id, newText) {
      let task = this.findIndexById(id);
      return task.update();
    }
  }
  
  class Item {
    constructor(text) {
      this.completionHistory = [];
      this.id = Math.floor(Math.random() * 1e5);
      this.description = text;
      this.createdAt = new Date().toLocaleTimeString();
      this.completedAt = null;
      this.completeHistory = [];
    }
  
    complete() {
      let now = new Date().toLocaleTimeString();
      this.completedAt = now;
      this.completionHistory.push(now);
  
      return this;
    }
  
    uncomplete() {
      this.completedAt = null;
      return this;
    }
  
    getCompHistory() {
      return this.completionHistory;
    }
  
    update(newText) {
      this.description = newText;
      return this;
    }
  }

  class DOM {

    findParentId(target) {
        let parentId = target.parentElement.getAttribute('id');
        return parentId;
    }

    getParentElementbyId (id) {
        let tasks = document.querySelectorAll('.task');
        for(let i=0; i<tasks.length; i++) {
        if(id === tasks[i].getAttribute('id')) {
            return tasks[i];
        }
        }
    }

    completeToggle(task, targetParentElement) {
      if (task.completedAt === null) {
        task.complete();
        targetParentElement.childNodes[1].classList.add('lineThrough_gray');
        targetParentElement.childNodes[0].childNodes[1].innerText = `Completed: ${task.completedAt}`;
      } else {
        task.uncomplete();
        targetParentElement.childNodes[0].childNodes[1].innerText = "";
        targetParentElement.childNodes[1].classList.remove('lineThrough_gray');
      };
      return targetParentElement;
    }
  
  }