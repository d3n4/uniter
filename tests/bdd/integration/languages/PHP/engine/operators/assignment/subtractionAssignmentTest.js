/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    '../../tools',
    '../../../tools',
    'js/util'
], function (
    engineTools,
    phpTools,
    util
) {
    'use strict';

    describe('PHP Engine subtraction assignment "-=" operator integration', function () {
        var engine;

        function check(scenario) {
            engineTools.check(function () {
                return {
                    engine: engine
                };
            }, scenario);
        }

        beforeEach(function () {
            engine = phpTools.createEngine();
        });

        util.each({
            'subtracting 4 from a variable containing integer': {
                code: '<?php $num = 7; $num -= 4; return $num;',
                expectedResult: 3,
                expectedResultType: 'integer',
                expectedStderr: '',
                expectedStdout: ''
            },
            'subtracting 4 from a variable containing float': {
                code: '<?php $num = 6.0; $num -= 4; return $num;',
                expectedResult: 2,
                expectedResultType: 'float',
                expectedStderr: '',
                expectedStdout: ''
            },
            'attempting to subtract 5 from undefined variable': {
                code: '<?php $num -= 5; var_dump($num); print "Done";',
                expectedResult: null,
                expectedStderr: util.heredoc(function () {/*<<<EOS
PHP Notice: Undefined variable: num

EOS
*/;}), // jshint ignore:line
                // Note that the 'Done' echo following the dump must be executed, this is only a notice
                expectedStdout: util.heredoc(function () {/*<<<EOS
int(-5)
Done
EOS
*/;}) // jshint ignore:line
            }
        }, function (scenario, description) {
            describe(description, function () {
                check(scenario);
            });
        });
    });
});
