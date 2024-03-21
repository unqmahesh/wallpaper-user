base url = /user/api/v1

signup :
    path = /signup
    req = userName , userEmail, userPassword, userRole
    res =  
    success =   status(201).json({success : true, data : userInsertedData})
    failed =     status(400).json({success : false, name : 'validation_error', message :                error.array(), data : []})
    failed = status(500).json({success : false, name : 'internal_server_error' message :           'something went wrong'})


singin : 
    path = /signin
    req = userEmail, userPassword
    res =
    success = status(200).json({success : true, data : userExsited})
    failed = status(400).json({success : false, name : 'validation_error', message :            error.array(), data : []})
    failed = status(500).json({success : false, name : 'internal_server_error' message :           'something went wrong'})