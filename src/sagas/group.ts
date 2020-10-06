import { PayloadAction } from '@reduxjs/toolkit'
import { takeEvery, call, put, fork } from 'redux-saga/effects'
// import types
import {  } from '../types/Group'
// import slices
import { requestCreateGroup, requestJoinGroup } from '../slice/group'

function* runRequestCreateGroup(action: PayloadAction<string>) {
  
}

function* handleRequestCreateGroup() {
  
}

export default function* groupSaga() {
  yield fork(handleRequestCreateGroup)
}