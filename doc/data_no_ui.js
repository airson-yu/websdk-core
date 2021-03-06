var grid = {
    col: [
        {title: '参数名', key: 'k1', width: 120},
        {title: '类型', key: 'k2', width: 100},
        {title: '必填', key: 'k3', width: 100},
        {title: '说明', key: 'k4'}
    ]
}

var common = {
    build_msg_code: function (msg_code) {
        return {
            k1: 'msg_code',
            k2: 'string',
            k3: 'yes',
            k4: '固定为:' + msg_code
        }
    },
    empty: {
        k1: '',
        k2: '',
        k3: '',
        k4: ''
    },
    async: {
        k1: '',
        k2: '',
        k3: '',
        k4: '此请求为异步请求'
    },
    async_result: {
        k1: 'result',
        k2: 'boolean',
        k3: 'yes',
        k4: '是否成功接收请求，请求结果将发送对应的Notice'
    },
    callback: {
        k1: 'callback',
        k2: 'function',
        k3: 'no',
        k4: '回调函数'
    },
    cbid: {
        k1: 'cbid',
        k2: 'string',
        k3: 'yes',
        k4: '全局唯一的回调函数ID'
    },
    session: {
        k1: 'session',
        k2: 'int',
        k3: 'yes',
        k4: '可忽略'
    },
    cmd_type_1: {
        k1: 'cmd_type',
        k2: 'int',
        k3: 'yes',
        k4: '固定为:1 (1-响应，2—通知)'
    },
    cmd_type_2: {
        k1: 'cmd_type',
        k2: 'int',
        k3: 'yes',
        k4: '固定为:2 (1-响应，2—通知)'
    },
    cmd_status: {
        k1: 'cmd_status',
        k2: 'int',
        k3: 'yes',
        k4: '0:成功, 其他值为错误'
    },
    error_reason: {
        k1: 'error_reason',
        k2: 'string',
        k3: 'no',
        k4: 'cmd_status不为0时,指明错误原因'
    },
    result: {
        k1: 'result',
        k2: 'boolean',
        k3: 'yes',
        k4: 'true:成功，false:失败'
    }
}

grid.authRequest_logon = {
    req: [
        {
            k1: 'ipaddr',
            k2: 'string',
            k3: 'yes',
            k4: '调度台登录的服务器IP地址'
        },
        {
            k1: 'port',
            k2: 'int',
            k3: 'yes',
            k4: '调度台登录的服务器端口'
        },
        {
            k1: 'orgid',
            k2: 'int',
            k3: 'yes',
            k4: '调度台所在的企业ID'
        },
        {
            k1: 'logon_name',
            k2: 'string',
            k3: 'yes',
            k4: '调度台账号登陆名'
        },
        {
            k1: 'password',
            k2: 'string',
            k3: 'yes',
            k4: '密码'
        },
        {
            k1: 'console_name',
            k2: 'string',
            k3: 'no',
            k4: '若调度台账号关联了多个调度台，需要指定关联哪个调度台'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_logon'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'consoles',
            k2: 'object array',
            k3: 'yes',
            k4: '当cmd_status不为0时，返回关联的调度台列表'
        },
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.authRequest_logout = {
    req: [
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_logout'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid
    ]
}

grid.authRequest_changePasswd = {
    req: [
        {
            k1: 'username',
            k2: 'string',
            k3: 'yes',
            k4: '用户名'
        },
        {
            k1: 'oldpasswd',
            k2: 'string',
            k3: 'yes',
            k4: '旧密码'
        },
        {
            k1: 'newpasswd',
            k2: 'string',
            k3: 'yes',
            k4: '新密码'
        },
        common.callback,
        common.cbid,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_change_passwd'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid
    ]
}

grid.userRequest_getUserInfo = {
    req: [
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组，若targets,exttargets都为空，则查询所有用户的信息'
        },
        {
            k1: 'exttargets',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组，若targets,exttargets都为空，则查询所有用户的信息'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_user_profile'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'user_info',
            k2: 'object array',
            k3: 'yes',
            k4: '用户信息'
        }
    ]
}

grid.userRequest_getConsoleInfo = {
    req: [
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'no',
            k4: '调度台ID数组，若为空，则查询所有调度台的信息'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_user_profile'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'user_info',
            k2: 'object array',
            k3: 'yes',
            k4: '调度台信息'
        }
    ]
}

grid.userRequest_setUserParams = {
    req: [
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'exttargets',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        },
        {
            k1: 'paraminfo',
            k2: 'json object',
            k3: 'no',
            k4: '参数JSON对象，如：{\'gps_report\': 0}, 参数项：gps_report:是否上报GPS; gps_interval:GPS上报周期(秒); gps_query:是否允许GPS查询; '
        },
        common.callback,
        common.cbid
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.userRequest_noticeUserState = {
    req: [
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        },
        common.callback,
        common.cbid
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.groupRequest_getGroupInfo = {
    req: [
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'no',
            k4: '群组ID数组，若为空，则查询所有群组的信息'
        },
        {
            k1: 'exttargets',
            k2: 'string array',
            k3: 'no',
            k4: '第三方群组ID数组，若targets,exttargets都为空，则查询所有群组的信息'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_grp_profile'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'group_info',
            k2: 'object array',
            k3: 'yes',
            k4: '群组信息'
        }
    ]
}

grid.groupRequest_enterGroup = {
    req: [
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'mute',
            k2: 'int',
            k3: 'no',
            k4: '如果为0或空，表明放声音，1则为静音'
        }
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.groupRequest_leaveGroup = {
    req: [
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        }
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty
    ]
}

grid.groupRequest_forceEnterGroup = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        }
    ],
    rsp: [
        common.async_result
    ]
}

grid.groupRequest_forceLeaveGroup = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        }
    ],
    rsp: [
        common.async_result
    ]
}

grid.groupRequest_addGroupMember = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        }
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty
    ]
}

grid.groupRequest_removeGroupMember = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        }
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty
    ]
}

grid.groupRequest_createGroup = {
    req: [
        {
            k1: 'name',
            k2: 'string',
            k3: 'yes',
            k4: '临时组名称'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '组成员用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方组成员用户ID数组'
        },
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_create_grp'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'yes',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'name',
            k2: 'string',
            k3: 'yes',
            k4: '临时组名称'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '组成员用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方组成员用户ID数组'
        }
    ]
}

grid.groupRequest_deleteGroup = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_delete_grp'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'yes',
            k4: '群组ID'
        }
    ]
}

grid.voiceRequest_call = {
    req: [
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
        },
        {
            k1: 'channel',
            k2: 'int',
            k3: 'no',
            k4: '仅仅当call_type ==1 时有效'
        },
        {
            k1: 'call_type',
            k2: 'int',
            k3: 'yes',
            k4: '1：音视频call  \n' +
                '15：全双工语音\n' +
                '16：全双工RTT（BMS->Console only）\n' +
                '17：全双工语音强拉（用于console处理BMS发起的Emergency，在该请求类型下，BMS不振铃，直接进入组中进行双工通话）\n' +
                '20：终端到调度台：半双工RTT。其他情况：半双工PTT\n'
        },
        {
            k1: 'priority',
            k2: 'int',
            k3: 'no',
            k4: '如果为空或为0，则表示使用发起者本身配置的优先级。第三方设置此值，在当前版本不起作用。'
        },
        {
            k1: 'start',
            k2: 'int',
            k3: 'yes',
            k4: '0: stop call, 1: start call'
        },
        {
            k1: 'telno',
            k2: 'string',
            k3: 'no',
            k4: 'PSTN单呼的电话号码，当call_type为32时有效'
        }
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.voiceRequest_callStatus = {
    req: [
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
        },
        {
            k1: 'channel',
            k2: 'int',
            k3: 'no',
            k4: '仅仅当call_type ==1 时有效'
        },
        {
            k1: 'call_type',
            k2: 'int',
            k3: 'yes',
            k4: '1：音视频call  \n' +
                '15：全双工语音\n' +
                '16：全双工RTT（BMS->Console only）\n' +
                '17：全双工语音强拉（用于console处理BMS发起的Emergency，在该请求类型下，BMS不振铃，直接进入组中进行双工通话）\n' +
                '20：终端到调度台：半双工RTT。其他情况：半双工PTT\n' +
                '32：PSTN单呼'
        },
        {
            k1: 'status',
            k2: 'int',
            k3: 'yes',
            k4:
                '67 – 接受\n' +
                '69 – 拒绝（对方提示目标忙）\n'
        },
        {
            k1: 'telno',
            k2: 'string',
            k3: 'no',
            k4: 'PSTN单呼的电话号码，当call_type为32时有效'
        },
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.voiceRequest_pttOn = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'yes',
            k4: '群组ID'
        }
    ],
    rsp: [
        common.async_result
    ]
}

grid.voiceRequest_pttOff = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'yes',
            k4: '群组ID'
        }
    ],
    rsp: [
        common.async_result
    ]
}

grid.voiceRequest_dtmf = {
    req: [
        {
            k1: 'telno',
            k2: 'string',
            k3: 'yes',
            k4: 'PSTN单呼的电话号码'
        },
        {
            k1: 'subno',
            k2: 'string',
            k3: 'yes',
            k4: 'PSTN单呼的分机号'
        }
    ],
    rsp: [
        common.async_result
    ]
}

grid.logonNotice = {
    rsp: [
        common.build_msg_code('notice_logon'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'cmd_status',
            k2: 'int',
            k3: 'yes',
            k4: '0已登录，1未登录，2当前账号已在其他设备登录'
        }
    ]
}

grid.logoutNotice = {
    rsp: [
        common.build_msg_code('notice_logout'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'reason',
            k2: 'string',
            k3: 'no',
            k4: '强制退出登录的原因'
        }
    ]
}

grid.userProfileNotice = {
    rsp: [
        common.build_msg_code('notice_user_profile'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'user_info',
            k2: 'object array',
            k3: 'yes',
            k4: '用户信息'
        }
    ]
}

grid.userParamsNotice = {
    rsp: [
        common.build_msg_code('notice_params_set'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组，若targets,exttargets都为空，则查询所有用户的信息'
        },
        {
            k1: 'exttargets',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组，若targets,exttargets都为空，则查询所有用户的信息'
        },
        {
            k1: 'paraminfo',
            k2: 'object',
            k3: 'yes',
            k4: '设置的参数详情'
        }
    ]
}

grid.userStateNotice = {
    rsp: [
        common.build_msg_code('notice_user_state'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '用户ID'
        },
        {
            k1: 'states',
            k2: 'object array',
            k3: 'no',
            k4: '终端状态信息'
        }
    ]
}

grid.callStatusNotice = {
    rsp: [
        common.build_msg_code('notice_call_status'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'demander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
        },
        {
            k1: 'call_type',
            k2: 'int',
            k3: 'yes',
            k4: '1：音视频call  \n' +
                '15：全双工语音\n' +
                '16：全双工RTT（BMS->Console only）\n' +
                '17：全双工语音强拉（用于console处理BMS发起的Emergency，在该请求类型下，BMS不振铃，直接进入组中进行双工通话）\n' +
                '20：终端到调度台：半双工RTT。其他情况：半双工PTT\n' +
                '32：PSTN单呼'
        },
        {
            k1: 'status',
            k2: 'int',
            k3: 'yes',
            k4: '64 – ready(仅视频call 有效)\n' +
                '65 – PTT ON请求被降级为通话请求\n' +
                '66 – 对方振铃中/振铃\n' +
                '67 – 对方已接受/接受\n' +
                '68 – 目标不可达\n' +
                '69 – 目标忙\n' +
                '70 – 目标无应答\n' +
                '71 – 由于网络不好，系统自动结束通话\n' +
                '250- 对方结束通话'
        },
        {
            k1: 'telno',
            k2: 'string',
            k3: 'no',
            k4: 'PSTN单呼的电话号码，当call_type为32时有效'
        }
    ]
}

grid.pttStatusNotice = {
    rsp: [
        common.build_msg_code('notice_ptt_status'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'status',
            k2: 'int',
            k3: 'yes',
            k4: 'PTT状态：\n' +
                '1:PTT 权限被授予给了callerid\n' +
                '2:U-PTT-ON请求被拒绝，拒绝原因参见reason值\n' +
                '3:当前PTT 被释放\n' +
                '4:当前PTT 权限被callerId抢占了'
        },
        {
            k1: 'callerid',
            k2: 'string',
            k3: 'no',
            k4: 'PTT发起者ID'
        },
        {
            k1: 'extcallerid',
            k2: 'string',
            k3: 'no',
            k4: 'PTT发起者第三方ID'
        },
        {
            k1: 'reason',
            k2: 'string',
            k3: 'no',
            k4: '当status值为2时，reason定义拒绝的原因:1\t尚未attach\n' +
                '2\t当前有PTT\n' +
                '3\t当前群组没有其他attach的成员\n' +
                '4\t服务器离线或未准备好\n' +
                '5\t强制释放\n' +
                '6\t当前的PTT 被用户callerid打断\n' +
                '65\tPTT ON请求被降级为请求通话\n' +
                '66\t目标振铃\n' +
                '67\t目标被强制attach到本群组。\n' +
                '68\t目标不可达\n' +
                '69\t目标忙'
        },
        {
            k1: 'refid',
            k2: 'int',
            k3: 'no',
            k4: '语音ID'
        },
        {
            k1: 'ts',
            k2: 'string',
            k3: 'yes',
            k4: 'Unix时间戳'
        }
    ]
}

grid.enterGroupNotice = {
    rsp: [
        common.build_msg_code('notice_enter_group'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        }
    ]
}

grid.leaveGroupNotice = {
    rsp: [
        common.build_msg_code('notice_leave_group'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'demander',
            k2: 'int',
            k3: 'no',
            k4: '命令的发起者的ID'
        },
        {
            k1: 'extdemander',
            k2: 'string',
            k3: 'no',
            k4: '命令的发起者第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        }
    ]
}

grid.addGroupMemberNotice = {
    rsp: [
        common.build_msg_code('notice_add_grp_mem'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        }
    ]
}

grid.removeGroupMemberNotice = {
    rsp: [
        common.build_msg_code('notice_rem_grp_mem'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'uids',
            k2: 'int array',
            k3: 'no',
            k4: '用户ID数组'
        },
        {
            k1: 'extuids',
            k2: 'string array',
            k3: 'no',
            k4: '第三方用户ID数组'
        }
    ]
}

grid.groupMemStatusNotice = {
    rsp: [
        common.build_msg_code('group_mem_status_notice'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'changedUsers',
            k2: 'object array',
            k3: 'yes',
            k4: '状态发生的变化的用户列表'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '群组ID'
        },
        {
            k1: 'exttgid',
            k2: 'string',
            k3: 'no',
            k4: '第三方群组ID'
        },
        {
            k1: 'canptt',
            k2: 'int',
            k3: 'yes',
            k4: '0:不能PPT，1可以PTT'
        }
    ]
}

