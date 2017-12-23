//
//  UShare.m
//  olive
//
//  Created by tangyunfei on 2017/11/22.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UShare.h"
//#import "UMSocialUIManager.h"
#import <UShareUI/UMSocialUIManager.h>
//#import "UMSocialShareScrollView.h"
#import <UMSocialCore/UMSocialCore.h>

@implementation UShare
RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(share:(NSString *)title content:(NSString *)content imageUrl:(NSString*)imageUrl targetUrl:(NSString*)targetUrl successCallback:(RCTResponseSenderBlock*)successCallback errorCallback:(RCTResponseSenderBlock*)errorCallback )
{
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    //创建分享消息对象
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    //创建网页内容对象
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:content thumImage:imageUrl];
    //设置网页地址
    shareObject.webpageUrl =targetUrl;
    
    //分享消息对象设置分享内容对象
    messageObject.shareObject = shareObject;
    
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
      if (error) {
        UMSocialLogInfo(@"************Share fail with error %@*********",error);
      }else{
        if ([data isKindOfClass:[UMSocialShareResponse class]]) {
          UMSocialShareResponse *resp = data;
          //分享结果消息
          UMSocialLogInfo(@"response message is %@",resp.message);
          //第三方原始返回的数据
          UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
        }else{
          UMSocialLogInfo(@"response data is %@",data);
        }
      }
    }];
  }];
}

RCT_EXPORT_METHOD(login:(RCTResponseSenderBlock)errorCallback callback:(RCTResponseSenderBlock)successCallback )
{
  [[UMSocialManager defaultManager] getUserInfoWithPlatform:UMSocialPlatformType_WechatSession currentViewController:nil completion:^(id result, NSError *error) {
    if (error) {
      errorCallback(@[[NSNull null]]);
    } else {
      UMSocialUserInfoResponse *resp = result;
      
      // 授权信息
      //NSLog(@"Wechat uid: %@", resp.uid);
      //NSLog(@"Wechat openid: %@", resp.openid);
      //NSLog(@"Wechat unionid: %@", resp.unionId);
      //NSLog(@"Wechat accessToken: %@", resp.accessToken);
      //NSLog(@"Wechat refreshToken: %@", resp.refreshToken);
      //NSLog(@"Wechat expiration: %@", resp.expiration);
      
      // 用户信息
      //NSLog(@"Wechat name: %@", resp.name);
      //NSLog(@"Wechat iconurl: %@", resp.iconurl);
      //NSLog(@"Wechat gender: %@", resp.unionGender);
      
      // 第三方平台SDK源数据
      //NSLog(@"Wechat originalResponse: %@", resp.originalResponse);
      
      //格式化输出
      NSString *format = @"{'name':'%@','gender':'%@','iconurl':'%@','country':'%@','province':'%@','city':'%@','openid':'%@','unionid':'%@'}";;
      NSString *fromatedNSString = [NSString stringWithFormat:format,resp.name,resp.unionGender,resp.iconurl,
                                    @"",@"",@"",
                                    resp.openid,resp.unionId];
      //NSLog(@"格式化输出的结果：%@",fromatedNSString);

      successCallback(@[fromatedNSString]);
      
    }
  }];
}

@end
