const authToken = {"id":1,"company_id":"Z82932d","user_id":"1856312647","full_name":"Malatesh","email":"malatesh.devagiri@kaleyra.com","account_owner":1,"is_admin":1,"reports_to":0,"role_id":1,"time_zone_id":22,"title":null,"mobile":"+917204256619","country_id":"277","profile_picture":null,"language":"en","email_verified":1,"phone_verified":1,"status":1,"last_logged_in":1566812440,"created_at":0,"updated_at":1566800126,"company":{"id":1,"company_id":"Z82932d","name":"malatesh","email":"malatesh.devagiri@kaleyra.com","website":null,"address":null,"city":null,"state":null,"country_id":277,"sid":"A657d34237","logo":null,"small_logo":null,"currency_id":1,"kyc_status_id":1,"status":1,"sub_status_id":null,"created_at":0,"updated_at":0},"request_id":"2019-08-26messages15ef1e3ef68d619e39a1960e0783818c","properties":{"enable_monthly_limit":"0","number_masking":"1","retry":"0","is_prepaid":"0","open_route":"1","mnp_routing":"1","traffic_distribution":"0","template_check":"1","is_demo":"1","keep_dnd_after_filter":"0","is_trial":"0","msg_txn_route":"1","content_hiding":"25","api":{"content_hiding":"12"}}};


module.exports = (req, res, next) => {
  req.userId = authToken;
  next();
};
