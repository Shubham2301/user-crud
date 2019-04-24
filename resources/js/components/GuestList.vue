<template>
  <div v-if="allGuests">
    <el-table
      :data="allGuests"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email">
      </el-table-column>
      <el-table-column
        align="right"
        label="Actions">
        <template slot-scope="scope">
          <i @click="handleShowProgram(scope.$index, scope.row)" class="fas fa-eye"></i>
          <i @click="handleEdit(scope.$index, scope.row)" class="fas fa-edit"></i>
          <i @click="handleDelete(scope.$index, scope.row)" class="fas fa-trash"></i>
        </template>
        </el-table-column>
    </el-table>

    <el-dialog
      v-if="showDialog"
      title="Guest Data"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div>
        <p>Name: {{selectedGuest.name}}</p>
        <p>email: {{selectedGuest.email}}</p>
        <p>Phone Number: {{selectedGuest.phone_number}}</p>
        <p>Gender: {{selectedGuest.gender}}</p>
        <p>City: {{selectedGuest.city}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['allGuests'],

  mounted() {
  },

  data() {
    return {
      selectedGuest: null,
      centerDialogVisible: false,
      showDialog: false
    }
  },

  methods: {
    handleShowProgram(index, guest) {
      this.selectedGuest = guest;
      this.centerDialogVisible = true;
      this.showDialog = true;
    },

    handleEdit(index, guest) {
      this.$emit('handleEditGuest', {guest_id: guest.id});
    },

    handleDelete(index, guest) {
       axios.delete('/api/guests/'+guest.id)
        .then((response) => {
          this.$emit('refreshList');
        })
      .catch(error => {
        console.log('err', error);
      }); 
    }
  }
}
</script>

<style>

</style>
