const response = {
    'GRT100': {'status' : 'GRT100', 'message' : 'Successfully received IVR details'},
    'GRT101': {'status' : 'GRT101', 'message' : 'Id parameter is missing'},
    'GRT102': {'status' : 'GRT102', 'message' : 'Id parameter must be a number'},
    'GRT103': {'status' : 'GRT103', 'message' : 'Data not found, Provide valid Id'},
    'GRT104': {'status' : 'GRT104', 'message' : 'Successfully recieved UUID'},
    'GRT105': {'status' : 'GRT105', 'message' : 'Could not fetch UUID'},
    'GRT106': {'status' : 'GRT106', 'message' : 'Successfully received Queue details'},
    'GRT107': {'status' : 'GRT107', 'message' : 'Queue name is missing'},
    'GRT108': {'status' : 'GRT108', 'message' : 'Queue name must be a string'},
    'GRT109': {'status' : 'GRT109', 'message' : 'Data not found, Provide valid name'},
    'GRT110': {'status' : 'GRT110', 'message' : 'Data not found'},
    'GRT111': {'status' : 'GRT111', 'message' : 'Succesfully recieved call limit'},
    'GRT112': {'status' : 'GRT112', 'message' : 'Send either customer ID or Number ID or Channnel ID'} 
}



module.exports.response = response;
