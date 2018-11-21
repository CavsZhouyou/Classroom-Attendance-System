/*
 * @Author: zhouyou@werun 
 * @Descriptions: 课程考勤详情页面
 * @TodoList: 无
 * @Date: 2018-11-21 11:19:33 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-11-21 15:37:44
 */

<template>
  <div id="course-attendance-detail-page">
    <a-row>
      <a-col :span="17">
        <div class="course-information">
          <h2>课程信息</h2>
          <p>《云计算导论：概念构架与应用》</p>
          <p>2018-11-5 14:00-16:00 <span class="date-last">8周</span></p>
          <p><span>任课老师：朴雪峰</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>授课班级：1611101-1611105</span></p>
        </div>
      </a-col>
      <a-col :span="5"
             :offset="1">
        <div class="time-box">
          <span class="time-text">Now</span>
          <span class="time">13 : 58 : 40</span>
          <span calss="date">2018年11月5日</span>
        </div>
      </a-col>
    </a-row>
    <div class="student-list">
      <h3>学生列表</h3>
      <div class="list-container">
        <div class="student-box attend">
          <img src="../assets/images/student1.jpg"
               alt="student">
          <br>
          <span class="name">Vasilisa</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student2.jpg"
               alt="student">
          <br>
          <span class="name">James</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student3.jpg"
               alt="student">
          <br>
          <span class="name">Love</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box">
          <img src="../assets/images/student4.jpg"
               alt="student">
          <br>
          <span class="name">Smith</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student5.jpg"
               alt="student">
          <br>
          <span class="name">Linda</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student6.jpg"
               alt="student">
          <br>
          <span class="name">Mike</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student7.jpg"
               alt="student">
          <br>
          <span class="name">nash</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box late">
          <img src="../assets/images/student8.jpg"
               alt="student">
          <br>
          <span class="name">swift</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student9.jpg"
               alt="student">
          <br>
          <span class="name">anmy</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student10.jpg"
               alt="student">
          <br>
          <span class="name">Lula</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box attend">
          <img src="../assets/images/student11.jpg"
               alt="student">
          <br>
          <span class="name">Mou</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
        <div class="student-box">
          <img src="../assets/images/student12.jpg"
               alt="student">
          <br>
          <span class="name">Beatuy</span>
          <br>
          <span class="check-button">
            <a-icon type="check" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CourseAttendanceDetailPage"
};
</script>


<style lang="scss" scoped>
$base_blue_color: #0086e5;

#course-attendance-detail-page {
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 300px;
}

.course-information {
  border: 1px solid #d1d5da;
  border-radius: 3px;

  h2 {
    border-bottom: 1px solid #d1d5da;
    padding-left: 30px;
    height: 50px;
    color: #3a3a3ac7;
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
    text-align: left;
  }

  p {
    padding-left: 30px;
    text-align: left;
  }

  .date-last {
    display: inline-block;
    padding: 0 5px 0;
    background: $base_blue_color;
    color: #fff;
    font-size: 7px;
  }
}

.time-box {
  border-radius: 5px;
  height: 165px;
  padding-top: 30px;
  background-color: $base_blue_color;
  color: #fff;

  span {
    display: block;
  }

  .time-text {
    margin-bottom: 7px;
    font-size: 15px;
    font-weight: bold;
  }

  .time {
    margin-bottom: 5px;
    font-size: 25px;
    font-weight: bold;
  }
}

.student-list {
  margin-top: 50px;

  h3 {
    padding-left: 30px;
    height: 50px;
    color: #3a3a3ac7;
    font-size: 17px;
    font-weight: bold;
    line-height: 50px;
    text-align: left;
  }

  .list-container {
    text-align: left;

    .student-box {
      display: inline-block;
      border: 1px solid #d1d5da;
      margin-left: 20px;
      margin-bottom: 30px;
      height: 240px;
      width: 230px;
      text-align: center;

      img {
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 50px;
        width: 100px;
        height: 100px;
      }

      span {
        color: #3a3a3a;
        font-size: 14px;
        font-weight: bold;
      }

      .check-button {
        display: inline-block;
        margin-top: 10px;
        border-radius: 5px;
        width: 100px;
        height: 30px;
        background: #d8d8d8;
        color: #fff;
        font-size: 20px;
        line-height: 30px;
      }
    }

    .attend {
      border: 1px solid #74d17f;

      .check-button {
        background: #74d17f;
      }
    }

    .late {
      border: 1px solid #de4c4c;

      .check-button {
        background: #de4c4c;
      }
    }
  }
}
</style>

