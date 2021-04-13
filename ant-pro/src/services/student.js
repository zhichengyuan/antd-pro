import request from '@/utils/request';
import qs from 'querystring'
const appkey = "demo13_1545210570249"



/**
 * 获取所有学生
 */
export async function getAllStudents() {
    return await request('/student/api/student/findAll?appkey=' + appkey)
        .then(res => res.json()).then(res => res.data);
}

export async function getStudents(page = 1,limit = 10) {
    return await request(`/student/api/student/findByPage?appkey=${appkey}&page=${page}&size=${limit}`)
            .then(resp => resp.data)
    // return await request(`/student/api/student/findByPage?appkey=${appkey}&page=${page}&size=${limit}`)
    //         .then(resp => resp.json()).then(resp => resp.data)
 }

 export async function searchStudents({page =1,limit=10,key="",sex=-1} ={}) {
   
    if(key && key !== '') {
        //搜索
        const resp = await request(`/student/api/student/searchStudent?appkey=${appkey}&page=${page}&size=${limit}&search=${key}&sex=${sex}`)
            .then(resp => resp.data)
        resp.datas = resp.searchList;
        delete resp.searchList
        return resp;
    }else {
        const resp =  await getStudents(page,limit);
        resp.datas = resp.findByPage;
        delete resp.findByPage
        return resp;
    }
  
 }

 export async function addStudent(stuObj) {
     const queryStr = qs.stringify(stuObj);
     const url = `/student/api/student/addStudent?appkey=${appkey}&${queryStr}`;
     return await request(url).then(resp => resp.json());
     console.log(url);
 }
 export async function updateStudent(stuObj) {
     const queryStr = qs.stringify(stuObj);
     const url = `/student/api/student/updateStudent?appkey=${appkey}&${queryStr}`;
     return await request(url).then(resp => resp.json());
     console.log(url);
 }

 export async function getStudentBySNo(sNo) {
     const stus = await getAllStudents();
     return stus.find(s => s.sNo === sNo)
 }

