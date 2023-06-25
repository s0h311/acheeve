<template>
  <div class="grid place-items-center gap-4 m-auto">
    <div class="flex w-full relative justify-center items-center">
      <h1 class="text-xl font-semibold">{{ $t('profile') }}</h1>
    </div>

    <span class="flex">
      <p class="font-thin">{{ $t('welcome_profile') }}</p>
      <p>&ensp;</p>
      <p class="italic">{{ userName }}</p>
    </span>

    <!--EMAIL-->
    <InputFieldEdit
      name="email"
      label="E-Mail"
      :placeholder="userData['email']"
      :errorMessage="!editingActive.email ? '' : errors.emailValidationError"
      :isDisabled="!editingActive.email"
      v-model="userData['email']"
      @activeEditing="onEditEmailClick"
      @input="errors.emailValidationError = ''"
    />

    <p
      v-if="emailChangeRequestSend"
      class="text-sm text-green-300"
    >
      {{ $t('email_change_confirmation_request') }}
    </p>

    <InputButton
      v-if="editingActive.email"
      :text="$t('save')"
      :isDisabled="userData.email === profile.email || emailChangeRequestSend"
      @click="onSaveEmail"
    />

    <!--PASSWORD-->
    <InputFieldEdit
      name="passwordNew"
      :label="t('password_new')"
      placeholder="******"
      :errorMessage="errors.newPasswordValidationError"
      :isDisabled="!editingActive.password"
      v-model="userData['passwordNew']"
      @activeEditing="onEditPasswordClick"
      @input="errors.newPasswordValidationError = ''"
    />

    <InputButton
      v-if="editingActive.password && !codeSent"
      :text="$t('send_code_to_email')"
      :isDisabled="!userData.passwordNew || codeSent"
      @click="handlePasswordChange"
    />

    <InputFieldEdit
      v-if="codeSent"
      class="w-1/3"
      name="code"
      label="Code"
      placeholder="123456"
      v-model="code"
    />

    <p
      v-if="codeSent && !code"
      class="text-sm text-green-300"
    >
      {{ $t('password_change_confirmation_request') }}
    </p>

    <p
      v-if="passwordChangedSuccessfully"
      class="text-sm text-green-300"
    >
      {{ $t('password_changed_successfully') }}
    </p>

    <InputButton
      v-if="codeSent"
      :text="$t('save')"
      @click="handlePasswordChange"
    />

    <!--LOGOUT-->
    <InputButton
      class="w-1/3"
      :text="$t('logout')"
      @click="handleLogout"
    />

    <!--DELETE ACCOUNT-->
    <button
      class="underline place-self-start"
      @click="showDialog = true"
    >
      {{ $t('delete_account') }}
    </button>

    <div
      v-if="showDialog"
      class="bg-dark2 p-4 w-3/4 md:w-1/2 lg:w-1/5 rounded-xl centerDialog"
    >
      <p class="text-lg text-center">{{ $t('confirm_account_delete') }}</p>
      <div class="grid grid-flow-col w-full space-x-4">
        <button
          class="bg-red-400 rounded-3xl px-4 py-2.5 mt-6 w-full text-sm font-bold"
          @click="onDeleteAccount"
        >
          {{ $t('delete') }}
        </button>

        <InputButton
          :text="$t('cancel')"
          @click="showDialog = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { UserProfile } from '../types/types'
definePageMeta({
  layout: 'with-nav-bar',
  middleware: ['auth'],
  pageTransition: false,
  layoutTransition: false,
})

const supabase = useSupabaseClient()
const l = useLocalePath()
const { t } = useI18n()

const profile: UserProfile = await useUserProfile()
const userName = computed<string>(() => profile.name.toUpperCase())

const editingActive = ref({
  email: false,
  password: false,
})

const codeSent = ref<boolean>(false)
const code = ref()

const emailChangeRequestSend = ref<boolean>(false)

const passwordChangedSuccessfully = ref<boolean>(false)

const showDialog = ref<boolean>(false)

onBeforeMount(() => {
  userData.value.email = profile.email
})

const errors = ref({
  emailValidationError: '',
  newPasswordValidationError: '',
})

const userData = ref({
  email: '',
  passwordNew: '',
})

const onEditEmailClick = () => {
  editingActive.value.email = !editingActive.value.email
  userData.value.email = profile.email
}

const onEditPasswordClick = () => {
  editingActive.value.password = !editingActive.value.password
  userData.value.passwordNew = ''
}

const onSaveEmail = async () => {
  if (userData.value.email !== profile.email) {
    let emailValidationError: string | null = useValidateMail(userData.value.email)
    if (emailValidationError) errors.value.emailValidationError = emailValidationError
    else {
      const { error } = await supabase.auth.updateUser({
        email: userData.value.email,
      })
      if (error) {
        throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
      } else {
        emailChangeRequestSend.value = true
        setTimeout(() => {
          emailChangeRequestSend.value = false
          editingActive.value.email = false
          userData.value.passwordNew = ''
        }, 3000)
      }
    }
  }
}

const handlePasswordChange = async () => {
  if (userData.value.passwordNew) {
    let newPasswordValidationError: string | null = useValidatePassword(userData.value.passwordNew)
    if (newPasswordValidationError) errors.value.newPasswordValidationError = newPasswordValidationError
    else {
      if (!codeSent.value) {
        const { error } = await supabase.auth.reauthenticate()
        codeSent.value = true
        if (error) {
          throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
        }
      }
      if (code.value) {
        if (code.value.length != 6) {
          //TODO display error, code must have the length 6
        }
        const { error } = await supabase.auth.updateUser({
          password: userData.value.passwordNew,
          nonce: code.value,
        })
        if (error) {
          throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
        } else {
          passwordChangedSuccessfully.value = true
          setTimeout(() => {
            passwordChangedSuccessfully.value = false
            editingActive.value.password = false
            codeSent.value = false
          }, 3000)
        }
      }
    }
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo(l('/login'))
}

const onDeleteAccount = async () => {
  const { error } = useFetch(`/api/user/${profile.id}`, {
    method: 'DELETE',
  })
  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
  }
  showDialog.value = false
  navigateTo(l('/login'))
}
</script>

<style scoped>
.centerDialog {
  position: absolute;
  left: 50%;
  right: 50;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
