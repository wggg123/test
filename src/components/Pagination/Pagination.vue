<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev">
          <a :class="pageNo==1?'disabled':''" @click="$emit('getPageNo',pageNo-1)">上一页</a>
        </li>
        <li v-if="startAndEnd.start>2">
          <a @click="$emit('getPageNo',1)">1</a>
        </li>
        <li class="dotted" v-if="startAndEnd.start>1"><span>...</span></li>
        <li v-for="(num,index) in continues" :key="index" :class="startAndEnd.start-1+num == pageNo ? 'active':''">
          <a @click="$emit('getPageNo',startAndEnd.start-1+num)">{{startAndEnd.start-1+num}}</a>
        </li>
        <li class="dotted" v-if="startAndEnd.end<=totalPage-1"><span>...</span></li>
        <li v-if="startAndEnd.end<totalPage-1">
          <a @click="$emit('getPageNo',totalPage)">{{totalPage}}</a>
        </li>
        <li class="next">
          <a :class="pageNo==totalPage?'disabled':''" @click="$emit('getPageNo',pageNo+1)">下一页</a>
        </li>
      </ul>

      <div><span>共{{total}}条&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageNo: Number,
    pageSize: Number,
    total: Number,
    continues: Number
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startAndEnd() {
      let start = 0
      let end = 0
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        if (start < 1) {
          start = 1
          end = this.continues
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less">
.page {
  // width: 733px;
  height: 66px;
  overflow: hidden;
  // float: right;
  // margin-right: 200px;

  .sui-pagination {
    margin: 18px 0;
    margin-left: 200px;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      // width: 640px;
      float: left;

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: left;
      margin-left: 80px;
      // width: 90px;
      line-height: 38px;
    }
  }
}
.disabled {
  cursor: not-allowed;
  color: rgb(154, 154, 154);
  pointer-events: none;
}
a {
  cursor: pointer;
}
</style>