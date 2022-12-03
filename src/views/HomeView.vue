<template>
  <main>
    <div>Hello {{ firstName }} {{ lastName }}!</div>
    <div>Authenticated: {{ isAuthenticated }}</div>
    <div>Role: {{ role }}</div>
    <div><button @click="logout">Logout</button></div>
  </main>
</template>

<script setup>
import Vue, { ref, onBeforeMount } from "vue";

const props = defineProps();
const firstName = ref("");
const lastName = ref("");
const role = ref("");
const isAuthenticated = ref(false);

onBeforeMount(() => {
  firstName.value = Vue.$keycloak.tokenParsed.given_name;
  lastName.value = Vue.$keycloak.tokenParsed.family_name;
  isAuthenticated.value = Vue.$keycloak.authenticated;
  role.value = Vue.$keycloak.tokenParsed.resource_access["app-vue"].roles;
});

const logout = () => {
  Vue.$keycloak.logout({ redirectUri: window.location.origin });
};
</script>
