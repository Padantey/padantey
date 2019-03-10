const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    'english': [
        {type: Schema.Types.ObjectId, ref:'notes'  }
    ],
    'graphics' : [
        {type: Schema.Types.ObjectId, ref:'notes'  } 
    ],
    'coa' : [
        {type: Schema.Types.ObjectId, ref:'notes'  }
    ],
    'dc': [
        { type: Schema.Types.ObjectId, ref:'notes'   } 
    ], 
    'instrumentation':[
        {type: Schema.Types.ObjectId, ref:'notes'  }
    ],
    'statisctics':[
        {type: Schema.Types.ObjectId, ref:'notes'  }
    ],
    'software': [
        {type: Schema.Types.ObjectId, ref:'notes'  }
    ]
})

module.exports = Subjects = mongoose.model('subject',SunjectSchema);