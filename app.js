const Form = {
  data() {
    return {
      userName: '',
      userAge: null,
      children: [],
      userProfile: {},
    };
  },
  methods: {
    AddChild: function () {
      if (this.children.length < 5) {
        this.children.push({
          childName: '',
          childAge: '',
        });
      } else {
        this.$refs.button.classList.add('disabled');
      }
    },
    DeleteChild: function (i) {
      this.children.splice(i, 1);
      this.$refs.button.classList.remove('disabled');
    },
    SaveProfile: function () {
      this.userProfile = {
        userName: this.userName,
        userAge: this.userAge,
        children: this.children,
      };
      this.$emit('GetUserProfile', this.userProfile);
      this.$router.push('preview');
    },
  },

  template: `<div class="user">
<h3>Персональные данные</h3>
<form class="user_form" action="" method="">
  <div class="form-control">
  <input type="text" id="userName" v-model="userName" required/>
    <label for="userName">Имя</label>
  </div>
  <div class="form-control">
    <input type="text" name="userAge" v-model="userAge" />
    <label for="userAge">Возраст</label>
  </div>
</form>
<div class="children">
<h3>Дети</h3>
<button @click="AddChild" class="children__addChildButton" ref="button">
<img src="plus.png">
  Добавить ребенка
</button>
<form class="children_form" action="" method="">
  <div
    class="children_form__item"
    v-for="(child, index) in children"
    :key="child"
  >
  <div class="form-control">
    <input
      type="text"
      name="childName"
      v-model="children[index].childName"
    />
    <label for="childName">Имя</label>
  </div>
  <div class="form-control">
    <input
      type="text"
      name="childAge"
      v-model="children[index].childAge"
    />
    <label for="childAge">Возраст</label>
  </div>
    <button
      class="children_form__deleteChildButton"
      @click="DeleteChild(index)"
    >
      Удалить
    </button>
  </div>
</form>
</div>
<button class="user_form__saveProfile" @click="SaveProfile">Сохранить</button>
</div>`,
};
const Preview = {
  props: {
    userProfileProp: Object,
  },
  template: `<div class="previewForm">
    <h3>Персональные данные</h3>
    <div class="previewForm_personalData" v-if="this.userProfileProp.userName && this.userProfileProp.userAge != undefined">{{this.userProfileProp.userName + ',' + this.userProfileProp.userAge}}</div>
    <h3>Дети</h3>
    <div class="previewForm_wrapper">
    <div class="previewForm_children"  v-for="child in this.userProfileProp.children" :key="child">{{child.childName + ',' + child.childAge}}</div></div>
    
    </div>`,
};

const routes = [
  { path: '/', component: Form },
  { path: '/preview', component: Preview },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  el: '#app',
  data() {
    return {
      userProfile: {},
    };
  },
  methods: {
    ToWriteUserProfile: function (payload) {
      this.userProfile = payload;
      console.log(this.userProfile.userName + 'i,m from app');
    },
  },
  template: `
  <header>

    <img src="Logo_imi_horizontal.png" />
    <nav>
      <router-link to="/">Форма</router-link>
      <router-link to="/preview">Превью</router-link>
    </nav>
  </header>
  <router-view @GetUserProfile="
(payload) => {
  ToWriteUserProfile(payload);
}" :userProfileProp="userProfile"></router-view>

<footer>
<p>all rights reserved</p></footer>

`,
});

app.use(router);
app.mount('#app');
