/*
 * This file is part of Report Portal.
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */
define(function (require, exports, module) {
    'use strict';

    var Util = require('util');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Epoxy = require('backbone-epoxy');
    var App = require('app');
    var Localization = require('localization');

    var config = App.getInstance();

    var DashboardListItemView = Epoxy.View.extend({
        className: 'dashboard-list-item-view',
        template: 'tpl-dashboard-list-item',

        bindings: {
            '[data-js-name]': 'text: name',
        },
        initialize: function(options) {
            this.render();
        },
        render: function() {
            this.$el.html(Util.templates(this.template, {}));
        },

        destroy: function () {
            this.undelegateEvents();
            this.stopListening();
            this.unbind();
            delete this;
        },
    });


    return DashboardListItemView;
});
