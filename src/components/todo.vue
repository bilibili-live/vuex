<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div v-if="!todoList.length">
        <h1>没有 todo-list</h1>
      </div>
      <el-table v-else :data="todoList" style="width: 100%">
        <el-table-column prop="date" label="日期" ></el-table-column>
        <el-table-column prop="ctx" label="内容" ></el-table-column>
        <el-table-column prop="status" label="状态" >
          <template slot-scope="{ row }">
            <el-tag :type="row.type">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="action" label="操作">
          <template slot-scope="{ row, $index }" >
            <el-button type="text" @click="changeTodoItem($index, row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="removeItem($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="todoList.length >= 2">
        <el-button type="success" @click="changeAllStatus">完成全部</el-button>
        <el-button type="success" style="margin: 12px 12px" @click="removeAllItem">删除全部</el-button>
      </div>
    </el-card>

    <el-dialog :visible.sync="model.change" style="text-align: left" @close="resetForm(false)">
      <el-form ref="updateTodoForm" :model="updateData" :rules="roles" label-width="80px">
        <el-form-item prop="ctx" label="内容">
          <el-input v-model="updateData.ctx" />
        </el-form-item>
        <el-form-item prop="date" label="日期">
           <el-date-picker v-model="updateData.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select prop="status" v-model="updateData.status" placeholder="请选择">
            <el-option v-for="(item, index) in options" :key="index" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="success" @click="handleChange">确定</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: {
        count: 1,
        money: 0,
        total: null
      },
      changeIndex: null,
      options: [
        '没开始',
        '开始了',
        '已完成'
      ],
      model: {
        change: false,
      },
      updateData: {
        ctx: '',
        status: '',
        date: ''
      },
      roles: {
        ctx: {
          required: true
        },
        status: {
          required: true
        },
        date: {
          required: true
        }
      }
    }
  },
  computed: {
    ...mapGetters([ 'todoList' ]),
    rawTodoList: _this=> {
      return _this.$store.state.todoList
    }
  },
  methods: {
    ...mapActions([ 'getTodoList', 'removeItem', 'change', 'removeAllItem', 'changeAllStatus' ]),
    async changeTodoItem(index) {
      this.changeIndex = index
      this.updateData = JSON.parse(JSON.stringify(this.rawTodoList[index]))
      this.model.change = true
    },
    handleChange() {
      this.$refs['updateTodoForm'].validate(flag=>{
        if (flag) {
          const item = JSON.parse(JSON.stringify(this.updateData))
          const index = this.changeIndex
          this.change({ item, index }).then(()=>{
            this.model.change = false
          })
        }
      })
    },
    async resetForm(flag) {
      return
      this.$refs['updateTodoForm'].resetFields()
      this.model.change = flag
    }
  },
  async created(){
    try {
      await this.getTodoList()
    } catch (error) {
      throw new Error(error)
    }
  }
}
</script>

<style>
</style>