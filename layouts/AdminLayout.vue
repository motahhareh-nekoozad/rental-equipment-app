<template>
  <div class="flex h-screen flex-col bg-baseBlack text-white" dir="rtl">

    <!-- Header -->
    <header class="flex items-center justify-center bg-baseBlack border-b border-gray-700 p-4 sticky top-0 z-50" >
      <div class="flex items-center  space-x-2 rtl:space-x-reverse">
        <img alt="Logo" class="h-8 w-8" />
        <span class="text-xl font-bold text-gold">RentalGear</span>
      </div>
    </header>

    <!-- Main Content with Sidebar -->
    <div class="flex flex-1 flex-row-reverse">

      <!-- Main Content -->
      <main class="flex-1 p-6 bg-baseBlack text-primary">
        <NuxtPage />
      </main>

      <!-- SideBar -->
      <aside class="w-60 bg-baseBlack p-6 flex flex-col space-y-4 border-l border-gray-700">
        <NuxtLink to="/admin/equipment"
          class="py-2 px-4 rounded border border-transparent hover:border-gold hover:bg-baseBlack transition duration-300"
          active-class="bg-primary border-gold text-baseBlack">
          تجهیزات
        </NuxtLink>

        <NuxtLink to="/admin/users"
          class="py-2 px-4 rounded border border-transparent hover:border-gold hover:bg-baseBlack transition duration-300"
          active-class="bg-primary border-gold text-baseBlack">
          کاربران
        </NuxtLink>

        <NuxtLink to="/admin/settings"
          class="py-2 px-4 rounded border border-transparent hover:border-gold hover:bg-baseBlack transition duration-300"
          active-class="bg-primary border-gold text-baseBlack">
          تنظیمات
        </NuxtLink>
      </aside>

    </div>
  </div>
</template>
