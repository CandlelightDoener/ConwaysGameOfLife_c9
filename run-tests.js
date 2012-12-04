if( !process.env.NODE_ENV ) process.env.NODE_ENV = 'test';

require(process.env.NODE_PATH + '/jasmine-node/lib/jasmine-node/cli.js');