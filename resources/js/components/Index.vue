<template>
    <div class="wrapper">
        <el-row :gutter="20">
            <el-col :span="12" class="list-section">
                <el-button @click="addGuest">Add Guest</el-button>
                <guest-list
                @refreshList="triggerRefeshList"
                @handleEditGuest="handleEdit($event)"
                :allGuests="allGuests"
                class="">
                </guest-list>
            </el-col>
            <el-col :span="12">
                <guest-form
                v-if="mode=='add' || mode=='edit'"
                @refreshList="triggerRefeshList"
                :guest_id="guestID"
                class="section">
                </guest-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import GuestForm from './GuestForm';
import GuestList from './GuestList';

export default {
    components: {
        GuestForm,
        GuestList
    },

    mounted(){
        this.get();
    },

    data() {
        return {
            guestID: null,
            refresh: false,
            mode: null,
            allGuests: []
        }
    },

    methods: {
        handleEdit(event){
            this.mode = 'edit';
            this.guestID = event.guest_id
        },

        triggerRefeshList() {
            this.get();
            this.mode = null;
            this.refresh = true;
        },

        addGuest() {
            this.mode = 'add';
            this.guestID = null
        },

        get() {
            axios.get('/api/guests')
                .then((response) => {
                    this.allGuests = response.data;
                })
            .catch(error => {
                console.log('err', error);
            });
        },
    }

}
</script>

<style>
.wrapper {
    margin-top: 100px;
}

.section {
    padding: 20px;
}

.list-section {
    border-right: 1px solid #d6d6d6;
}
</style>
