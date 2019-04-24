<template>
  <div>
    <el-form :model="guestForm" :rules="rules" ref="guestForm" label-width="120px" class="demo-guestForm">
        <el-form-item label="Guest Name" prop="name">
          <el-input v-model="guestForm.name"></el-input>
        </el-form-item>

        <el-form-item label="Guest Email" prop="email">
          <el-input v-model="guestForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Guest Phone" prop="phone_number">
          <el-input v-model="guestForm.phone_number"></el-input>
        </el-form-item>

        <el-form-item label="City" prop="city">
          <el-select v-model="guestForm.city" placeholder="City">
            <el-option label="Delhi" value="delhi"></el-option>
            <el-option label="Hyderabad" value="hyderabad"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Gender" prop="gender">
          <el-radio-group v-model="guestForm.gender">
            <el-radio label="Male"></el-radio>
            <el-radio label="Female"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('guestForm')">Save</el-button>
          <el-button @click="resetForm('guestForm')">Reset</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['guest_id'],

  mounted() {
    if(this.guest_id && this.guest_id != null) {
      this.getGuest();
    }
  },

  watch: {
    guest_id: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      if(newVal != oldVal && newVal != null) {
        this.getGuest();
      }
    }
  },

  data() {
      return {
        guestForm: {
          name: '',
          email: '',
          phone_number: '',
          city: '',
          gender: '',
        },
        rules: {
          name: [
            { required: true, message: 'Please input Guest name', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Please enter Guest Email', trigger: 'blur' }
          ],
          phone_number: [
            { required: true, message: 'Please enter Guest Phone Number', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Please select City', trigger: 'change' }
          ],
          gender: [
            { required: true, message: 'Please select gender', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.guest_id ) {
              console.log('update');
              this.updateGuest();
            } else {
              console.log('create');
              this.addGuest();
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      addGuest() {
        let payload = this.guestForm;
        axios.post('/api/guests', payload)
          .then((response) => {
            this.triggerRefresh();
          })
        .catch(error => {
          console.log('err', error);
        });
      },

      updateGuest() {
        let payload = this.guestForm;
        axios.put('/api/guests/'+this.guest_id, payload)
          .then((response) => {
            this.triggerRefresh();
          })
        .catch(error => {
          console.log('err', error);
        });
      },

      getGuest() {
        axios.get('/api/guests/'+this.guest_id)
          .then((response) => {
            this.guestForm =  response.data;
          })
        .catch(error => {
          console.log('err', error);
        });
      },

      triggerRefresh() {
        this.$emit('refreshList');
      }
    }

}
</script>

<style>

</style>
