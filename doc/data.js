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
        {
            k1: 'client_alive_time',
            k2: 'int',
            k3: 'no',
            k4: '客户端保活时长，单位分钟'
        },
        common.callback,
        common.cbid,
        common.empty,
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
        {
            k1: 'clientid',
            k2: 'string',
            k3: 'no',
            k4: '客户端连接ID（登录成功时有值）'
        },
        {
            k1: 'client_alive_time',
            k2: 'string',
            k3: 'no',
            k4: '客户端保活时长，单位分钟（登录成功时有值）'
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

grid.authRequest_emergencyHandled = {
    req: [
        {
            k1: 'uid',
            k2: 'int',
            k3: 'no',
            k4: '报警的用户ID'
        },
        {
            k1: 'extUid',
            k2: 'string',
            k3: 'no',
            k4: '报警的第三方用户ID'
        },
        {
            k1: 'processor',
            k2: 'int',
            k3: 'no',
            k4: '处理告警的调度台的ID'
        },
        {
            k1: 'timestamp',
            k2: 'int',
            k3: 'yes',
            k4: '报警时间， Unix时间戳'
        },
        {
            k1: 'ack_type',
            k2: 'int',
            k3: 'yes',
            k4: '0：告警已处理完毕'
        },
        common.callback,
        common.cbid
    ],
    rsp: [
        common.build_msg_code('rsp_emergencyHandled'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        common.empty
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

grid.userRequest_getUserStateAsync = {
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

grid.userRequest_addAdminUsers = {
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
        common.cbid,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_add_admin_users'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'user_infos',
            k2: 'object array',
            k3: 'yes',
            k4: '用户基本信息数据，参考：[{"uid":65803,"ext_id":"itrunk_65803","display_name":"yrhu1","img_url":null,"phone":"19940682602","priority":3,"admin":1,"state":1,"type":"portable","oc":0,"policeid":null,"cameras":[],"param":{"gps_report":1073741825,"gps_interval":1073741854}}]'
        }
    ]
}

grid.gpsRequest_queryGPS = {
    req: [
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
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

grid.gpsRequest_queryHistoryGPS = {
    req: [
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
        },
        {
            k1: 'starttime',
            k2: 'string',
            k3: 'yes',
            k4: '开始时间，如：2019-06-05 10:00:46(不能超过当前时间)'
        },
        {
            k1: 'endtime',
            k2: 'string',
            k3: 'yes',
            k4: '结束时间，如：2019-06-05 22:00:46(不能超过当前时间,起始时间和结束时间不能超过24小时)'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('rsp_query_history_gps'),
        common.session,
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标用户ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'yes',
            k4: '消息的目标第三方用户ID'
        },
        {
            k1: 'uid',
            k2: 'int',
            k3: 'yes',
            k4: '用户ID'
        },
        {
            k1: 'extuid',
            k2: 'string',
            k3: 'yes',
            k4: '第三方用户ID'
        },
        {
            k1: 'points',
            k2: 'object array',
            k3: 'no',
            k4: 'GPS点位信息(point内部结构参考底部图片：gps_point内部结构)'
        },
        {
            k1: 'total',
            k2: 'int',
            k3: 'yes',
            k4: '点位总数'
        }
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

grid.groupRequest_getGroupAttachInfo = {
    req: [
        {
            k1: 'targets',
            k2: 'int array',
            k3: 'yes',
            k4: '群组ID数组'
        },
        common.callback,
        common.cbid,
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
        },
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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

grid.imRequest_sendIM = {
    req: [
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标用户ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'yes',
            k4: '消息的目标第三方用户ID'
        },
        {
            k1: 'im_type',
            k2: 'int',
            k3: 'yes',
            k4: '消息类型（1: 文字）'
        },
        {
            k1: 'content',
            k2: 'string',
            k3: 'yes',
            k4: '消息内容'
        },
        {
            k1: 'time',
            k2: 'long',
            k3: 'yes',
            k4: '消息发送时间，long型毫秒数'
        }
        //target, exttarget, im_type, content, time, callback, cbid
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.videoRequest_playVideo = {
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'resolution',
            k2: 'int',
            k3: 'no',
            k4: '视频推送的分辨率，0：默认设置，1：320_240，2：640_480，7：1280_720'
        },
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头。(暂不支持，请填1)'
        },*/
        {
            k1: 'playid',
            k2: 'long',
            k3: 'no',
            k4: '仅仅notice_play_video 中有效'
        }
        //target, exttarget, im_type, content, time, callback, cbid
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}

grid.videoRequest_stopVideo = {
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'stop_type',
            k2: 'int',
            k3: 'no',
            k4: '0:停止视频播放和推流，1:仅停止视频播放，不停止推流'
        },
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头'
        },*/
    ],
    rsp: [
        common.async_result,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ]
}


grid.videoRequest_switchCamera = {
    req: [
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'type',
            k2: 'int',
            k3: 'no',
            k4: '切换类型：0 – 切换前后摄像头；1 – 按配置切换。目前只支持type为0'
        }
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头'
        },*/
    ],
    rsp: [
        common.build_msg_code('req_switch_camera'),
        common.session,
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        }
    ]
}

grid.videoRequest_updateVideoSet = {
    req: [
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'resolution',
            k2: 'int',
            k3: 'no',
            k4: '要切换的视频分辨率。1 - 320*240、3 – 640*480、7 – 1280*720'
        },
        {
            k1: 'quality',
            k2: 'int',
            k3: 'no',
            k4: '画面质量， 0，使用默认值， 1-流畅（码率较低），2-清晰（高码率）'
        }
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头'
        },*/
    ],
    rsp: [
        common.build_msg_code('req_update_video_set'),
        common.session,
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        common.empty
    ]
}

grid.videoRequest_getVideoList = {
    req: [
        {
            k1: 'start',
            k2: 'int',
            k3: 'no',
            k4: '数据分页起始值'
        },
        {
            k1: 'count',
            k2: 'int',
            k3: 'no',
            k4: '数据分页条数'
        },
        {
            k1: 'starttime',
            k2: 'string',
            k3: 'no',
            k4: '开始时间，采用"2008-10-13 16:00:00"格式'
        },
        {
            k1: 'endtime',
            k2: 'string',
            k3: 'no',
            k4: '结束时间，格式同上'
        },
        {
            k1: 'name',
            k2: 'string',
            k3: 'no',
            k4: '用户名称'
        },
        common.callback,
        common.cbid,
        common.empty
    ],
    rsp: [
        common.build_msg_code('req_get_video_list'),
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'rows',
            k2: 'json array',
            k3: 'no',
            k4: '视频数据列表，格式参考：{duration: "00:00:02", id: 791, m3u8: null, name: "视频文件791", rate: "1001.610", ' +
                'size: "0.29M",time: "2020-03-31 16:56:14",url: null,user: "zone1 1",' +
                'videoUrl: "/home/itrunk/video/record/2020-03-31/01590849_00082006_2020-03-31_16:56:14_0.mp4",' +
                'originUrl: "http://39.105.135.70:80/rtv/video_record/2020-03-31/01590849_00082006_2020-03-31_16_56_14_0.mp4"},' +
                'url为m3u8格式,此格式需要使用transformVideo接口转换，originUrl为mp4格式'
        },
        {
            k1: 'total',
            k2: 'int',
            k3: 'no',
            k4: '视频数据总条数'
        }
    ]
}

grid.videoRequest_transformVideo = {
    req: [
        {
            k1: 'videoid',
            k2: 'string',
            k3: 'no',
            k4: '视频ID'
        },
        {
            k1: 'videourl',
            k2: 'string',
            k3: 'no',
            k4: '视频URL'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('req_transform_video'),
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'url',
            k2: 'string',
            k3: 'no',
            k4: '视频URL'
        }
    ]
}

grid.videoRequest_getPushVideoUsers = {
    req: [
        common.callback,
        common.cbid,
        common.empty,
        common.empty,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('req_get_push_video_users'),
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'videos',
            k2: 'json array',
            k3: 'yes',
            k4: '每个object包含的字段：uid,extuid,display_name,session,channel,resolution,quality'
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
                '20：终端到调度台：半双工RTT。其他情况：半双工PTT\n' +
                '32：PSTN单呼'
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
        common.empty,
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
        common.async_result,
        common.empty
    ]
}

grid.audioRequest_getAudioList = {
    req: [
        {
            k1: 'start',
            k2: 'int',
            k3: 'no',
            k4: '数据条数起始值，默认为0，即从第一条开始'
        },
        {
            k1: 'count',
            k2: 'int',
            k3: 'no',
            k4: '数据分页条数，默认为100，即每次最多返回100条数据'
        },
        {
            k1: 'starttime',
            k2: 'string',
            k3: 'no',
            k4: '开始时间，默认为当前月，采用"2008-10-13 16:00:00"格式'
        },
        {
            k1: 'endtime',
            k2: 'string',
            k3: 'no',
            k4: '结束时间，默认为当前月，格式同上'
        },
        {
            k1: 'callerlike',
            k2: 'string',
            k3: 'no',
            k4: '发起人名称'
        },
        {
            k1: 'calleelike',
            k2: 'string',
            k3: 'no',
            k4: '接收人名称'
        },
        {
            k1: 'tglike',
            k2: 'string',
            k3: 'no',
            k4: '群组名称'
        },
        {
            k1: 'type',
            k2: 'int',
            k3: 'no',
            k4: '语音类型：1个呼，2组呼'
        },
        common.callback,
        common.cbid,
        common.empty
    ],
    rsp: [
        common.build_msg_code('req_get_audio_list'),
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'rows',
            k2: 'json array',
            k3: 'no',
            k4: '视频数据列表，格式参考：{"callee":"164010","calleeAudioUrl":null,"calleeName":"办公室","callerName":"fan","callerid":65890,"corpId":1,"corpid":null,"end":1609382857000,"id":666,' +
                '"path":"20201231/164010/65890_164010_277478328_20201231104733.amr","pttid":277478328,"ssid":null,"start":1609382853000,"suffix":"202012","tgid":164010,"type":1}'
        },
        {
            k1: 'total',
            k2: 'int',
            k3: 'no',
            k4: '数据总条数'
        }
    ]
}

grid.audioRequest_transformAudio = {
    req: [
        {
            k1: 'audioid',
            k2: 'int',
            k3: 'no',
            k4: '音频ID'
        },
        {
            k1: 'suffix',
            k2: 'string',
            k3: 'no',
            k4: '音频ID后缀，协助唯一定位视频文件'
        },
        {
            k1: 'path',
            k2: 'string',
            k3: 'no',
            k4: '音频地址'
        },
        common.callback,
        common.cbid,
        common.empty,
        common.empty
    ],
    rsp: [
        common.build_msg_code('req_transform_audio'),
        common.cmd_type_1,
        common.cmd_status,
        common.error_reason,
        common.cbid,
        {
            k1: 'url',
            k2: 'string',
            k3: 'no',
            k4: '音频URL'
        }
    ]
}

grid.view_showUserModal = {
    req: [
        {
            k1: 'uid',
            k2: 'int',
            k3: 'no',
            k4: '用户ID'
        },
        {
            k1: 'extUid',
            k2: 'string',
            k3: 'no',
            k4: '第三方用户ID'
        },
        {
            k1: 'callback',
            k2: 'function',
            k3: 'no',
            k4: '回调函数'
        }
    ],
    rsp: [
        common.result,
        common.empty,
        common.empty
    ]
}

grid.view_showGroupModal = {
    req: [
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'yes',
            k4: '群组ID'
        },
        {
            k1: 'callback',
            k2: 'function',
            k3: 'no',
            k4: '回调函数'
        }
    ],
    rsp: [
        common.result,
        common.empty
    ]
}

grid.showCreateGroupModal = {
    req: [
        {
            k1: 'callback',
            k2: 'function',
            k3: 'no',
            k4: '回调函数'
        }
    ],
    rsp: [
        common.result
    ]
}

grid.getPlayVideoUids = {
    req: [
        {
            k1: 'callback',
            k2: 'function',
            k3: 'no',
            k4: '回调函数'
        },
        common.empty
    ],
    rsp: [
        common.result,
        {
            k1: 'data',
            k2: 'int array',
            k3: 'yes',
            k4: '用户ID数组'
        }
    ]
}

grid.set_video_close_action = {
    req: [
        {
            k1: 'action',
            k2: 'integer',
            k3: 'yes',
            k4: '操作类型取值：1:弹框询问(默认), 2:只关闭视频窗口, 3:关闭视频窗口并关闭终端视频。（包括终端主动推送和调度台拉取）'
        }
    ],
    rsp: [
        common.result
    ]
}

grid.set_video_pull_close_action = {
    req: [
        {
            k1: 'action',
            k2: 'integer',
            k3: 'yes',
            k4: '只针对调度台拉取视频的操作类型取值：0:同video_close_action(默认), 1:弹框询问, 2:只关闭视频窗口, 3:关闭视频窗口并关闭终端视频。（优先级高于video_close_action）'
        }
    ],
    rsp: [
        common.result
    ]
}

grid.set_video_push_close_action = {
    req: [
        {
            k1: 'action',
            k2: 'integer',
            k3: 'yes',
            k4: '只针对终端主动推视频的操作类型取值：0:同video_close_action(默认), 1:弹框询问, 2:只关闭视频窗口, 3:关闭视频窗口并关闭终端视频。（优先级高于video_close_action）'
        }
    ],
    rsp: [
        common.result
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

grid.emergencyAlarmNotice = {
    rsp: [
        common.build_msg_code('notice_emergency'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'uid',
            k2: 'int',
            k3: 'no',
            k4: '报警的用户ID'
        },
        {
            k1: 'extUid',
            k2: 'string',
            k3: 'no',
            k4: '报警的第三方用户ID'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标地址'
        },
        {
            k1: 'timestamp',
            k2: 'int',
            k3: 'yes',
            k4: '报警时间， Unix时间戳'
        },
        {
            k1: 'notes',
            k2: 'string',
            k3: 'no',
            k4: '告警留言'
        }
    ]
}

grid.emergencyHandledNotice = {
    rsp: [
        common.build_msg_code('notice_emergency_handled'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'uid',
            k2: 'int',
            k3: 'no',
            k4: '报警的用户ID'
        },
        {
            k1: 'extUid',
            k2: 'string',
            k3: 'no',
            k4: '报警的第三方用户ID'
        },
        {
            k1: 'processor',
            k2: 'int',
            k3: 'no',
            k4: '处理告警的调度台的ID'
        },
        {
            k1: 'timestamp',
            k2: 'int',
            k3: 'yes',
            k4: '报警时间， Unix时间戳'
        },
        {
            k1: 'ack_type',
            k2: 'int',
            k3: 'yes',
            k4: '0：告警已处理完毕'
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
            k4: '终端状态信息数组，参考：[{"uid":65803,"extid":"itrunk_65803","state":4,"atg":0},{"uid":65835,"extid":"itrunk_65835","state":7,"atg":98678},{"uid":65802,"extid":null,"state":7,"atg":0},{"uid":65780,"extid":null,"state":4,"atg":0}]' +
                '  state状态取值:  8：已删除\n' +
                '7：在线\n' +
                '5：离线\n' +
                '4：离线\n' +
                '3：已停用\n' +
                '1：已停用\n' +
                '0：已停用'
        }
    ]
}

grid.userGPSNotice = {
    rsp: [
        common.build_msg_code('notice_gps'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标用户ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'yes',
            k4: '消息的目标第三方用户ID'
        },
        {
            k1: 'uid',
            k2: 'int',
            k3: 'yes',
            k4: '用户ID'
        },
        {
            k1: 'extuid',
            k2: 'string',
            k3: 'yes',
            k4: '第三方用户ID'
        },
        {
            k1: 'points',
            k2: 'object array',
            k3: 'no',
            k4: 'GPS点位信息(point内部结构参考底部图片：gps_point内部结构)'
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

grid.groupAttachInfoNotice = {
    rsp: [
        common.build_msg_code('notice_group_attach_info'),
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'attach_info',
            k2: 'object array',
            k3: 'yes',
            k4: '群组成员信息，object字段：' +
                '\ntgid - int - 群组ID，' +
                '\nuids_num - int - 成员总数，' +
                '\nuids - int array - 成员ID列表，' +
                '\nextuids - string array - 成员外部ID列表，' +
                '\nattached_num - int - 进入群组的人数，' +
                '\nattached_uids - int array - 进入群组的用户ID列表，' +
                '\nattached_extuids - string array - 进入群组的用户外部ID列表'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
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
            k3: 'yes',
            k4: '群组ID'
        },
        {
            k1: 'canptt',
            k2: 'int',
            k3: 'yes',
            k4: '0:不能PPT，1可以PTT'
        }
    ]
}

grid.imNotice = {
    rsp: [
        common.build_msg_code('notice_im'),
        //{"uid":68505,"extuid":"itrunk_68505","target":68505,"exttarget":"itrunk_68505","im_type":1,
        // //"content":null,"filename":null,"ourl":null,"surl":null,"size":0,"msg_code":"notice_im","cmd_type":2,
        // //"session":0,"cmd_status":0,"error_reason":null,"cbid":null}
        common.cmd_type_2,
        common.session,
        common.cbid,
        {
            k1: 'uid',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标用户ID'
        },
        {
            k1: 'extuid',
            k2: 'string',
            k3: 'yes',
            k4: '消息的目标第三方用户ID'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '消息的目标用户ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'yes',
            k4: '消息的目标第三方用户ID'
        },
        {
            k1: 'im_type',
            k2: 'int',
            k3: 'yes',
            k4: '消息类型（1: 文字）'
        },
        {
            k1: 'content',
            k2: 'string',
            k3: 'yes',
            k4: '消息内容'
        }
    ]
}

grid.openVideoNotice = {
    rsp: [
        common.build_msg_code('notice_play_video'),
        common.cmd_type_2,
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'resolution',
            k2: 'int',
            k3: 'no',
            k4: '视频推送的分辨率，0：默认设置，1：320_240，2：640_480，7：1280_720'
        },
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头。(暂不支持，请填1)'
        },*/
        {
            k1: 'playid',
            k2: 'long',
            k3: 'no',
            k4: '仅仅notice_play_video 中有效，如果为0则表示终端在推流，但是调度台不主动播放的场景（根据调度台本地配置：AutoDisplayVideo）'
        }
    ]
}

grid.stopVideoNotice = {
    rsp: [
        common.build_msg_code('notice_play_video'),
        common.cmd_type_2,
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头'
        },*/
    ]
}

grid.openVideoRspNotice = {
    rsp: [
        common.build_msg_code('notice_rsp_play_video'),
        common.cmd_type_2,
        common.cbid,
        {
            k1: 'cmd_status',
            k2: 'int',
            k3: 'yes',
            k4: '状态和错误原因。\n' +
                '0：ready\n' +
                '1：配置不允许上拉视频\n' +
                '2： 用户拒绝请求\n' +
                '3：正在等待用户响应。\n' +
                '4： 用户无响应\n' +
                '5： 摄像头未打开\n' +
                '6： 视频数超过限制\n' +
                '100: 超时无响应'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
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
            k4: '摄像头通道号。对于终端自身的摄像头，该值为0'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        },
        {
            k1: 'resolution',
            k2: 'int',
            k3: 'no',
            k4: '视频推送的分辨率，0：默认设置，1：320_240，2：640_480，7：1280_720'
        },
        /*{
            k1: 'camera',
            k2: 'int',
            k3: 'no',
            k4: '1:后摄像头，2，前摄像头。(暂不支持，请填1)'
        },*/
        {
            k1: 'playid',
            k2: 'long',
            k3: 'no',
            k4: '仅仅notice_play_video 中有效'
        }
    ]
}

grid.stopVideoRspNotice = {
    rsp: [
        common.build_msg_code('notice_rsp_stop_play_video'),
        common.cmd_type_2,
        common.cbid,
        {
            k1: 'cmd_status',
            k2: 'int',
            k3: 'yes',
            k4: '停止视频命令的状态\n' +
                '0: BMS 停止推流\n' +
                '1：当前还有其他调度台在上调此视频流\n' +
                '2：BMS 无响应。'
        },
        {
            k1: 'target',
            k2: 'int',
            k3: 'no',
            k4: '被请求者的ID'
        },
        {
            k1: 'exttarget',
            k2: 'string',
            k3: 'no',
            k4: '被请求者的第三方ID'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
    ]
}

grid.startVideoConfNotice = {
    rsp: [
        common.build_msg_code('notice_start_video_conf'),
        common.cmd_type_2,
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
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '会商的群组ID'
        },
        {
            k1: 'status',
            k2: 'int',
            k3: 'yes',
            k4: '0 – 接受；1 – 拒绝；2 – 超时；3 – 振铃'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
    ]
}

grid.stopVideoConfNotice = {
    rsp: [
        common.build_msg_code('notice_stop_video_conf'),
        common.cmd_type_2,
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
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '会商的群组ID'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
    ]
}

grid.stopVideoConfNotice = {
    rsp: [
        common.build_msg_code('notice_stop_video_conf'),
        common.cmd_type_2,
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
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '会商的群组ID'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
    ]
}

grid.shareVideoInVideoConfNotice = {
    rsp: [
        common.build_msg_code('notice_share_video_in_video_conf'),
        common.cmd_type_2,
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
            k4: '命令的发起者的第三方ID'
        },
        {
            k1: 'tgid',
            k2: 'int',
            k3: 'no',
            k4: '会商的群组ID'
        },
        {
            k1: 'session',
            k2: 'long',
            k3: 'no',
            k4: '客户端随机ID,用它来支持异步。如果为0，系统会产生一个随机数'
        }
    ]
}

grid.webUserLocationNotice = {
    rsp: [
        {
            k1: 'uid',
            k2: 'int',
            k3: 'yes',
            k4: '用户ID(返回值非JSON对象，而是做为第一个参数传递)'
        }
    ]
}

grid.notice_im_modal_open = {
    rsp: [
        common.build_msg_code('notice_im_modal_open'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的ID，有可能为uid或tgid，根据im_target_type字段判断类型'
        },
        {
            k1: 'im_target_type',
            k2: 'int',
            k3: 'yes',
            k4: '类型：1用户窗口，2群组窗口'
        }
    ]
}

grid.notice_im_modal_close = {
    rsp: [
        common.build_msg_code('notice_im_modal_open'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的ID，有可能为uid或tgid，根据im_target_type字段判断类型'
        },
        {
            k1: 'im_target_type',
            k2: 'int',
            k3: 'yes',
            k4: '类型：1用户窗口，2群组窗口'
        }
    ]
}

grid.notice_video_modal_open = {
    rsp: [
        common.build_msg_code('notice_video_modal_open'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
    ]
}

grid.notice_video_modal_close = {
    rsp: [
        common.build_msg_code('notice_video_modal_close'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
        {
            k1: 'manually',
            k2: 'boolean',
            k3: 'yes',
            k4: '是否为调度台手动关闭（主动操作UI触发关闭）'
        }
    ]
}

grid.notice_video_call_modal_open = {
    rsp: [
        common.build_msg_code('notice_video_call_modal_open'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
    ]
}

grid.notice_video_call_modal_close = {
    rsp: [
        common.build_msg_code('notice_video_call_modal_close'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
    ]
}


grid.notice_voice_call_modal_open = {
    rsp: [
        common.build_msg_code('notice_voice_call_modal_open'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
    ]
}

grid.notice_voice_call_modal_close = {
    rsp: [
        common.build_msg_code('notice_voice_call_modal_close'),
        common.cmd_type_2,
        {
            k1: 'target',
            k2: 'int',
            k3: 'yes',
            k4: '对方的UID'
        },
    ]
}