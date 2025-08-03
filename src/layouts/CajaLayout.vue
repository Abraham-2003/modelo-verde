<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
</script>
