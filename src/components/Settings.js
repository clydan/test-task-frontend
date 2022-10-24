
import React from "react";

const Settings = ({settings}) => {
    return (
        <div className="settings">
            <p>Total Tables: {settings.setting.table_count}</p>
            <p>Total Chairs: {settings.setting.chair_count}</p>
            <p>Available Chairs: {settings.setting.chair_count - settings.setting.chairs_taken}</p>
            <p>Max Chairs: {settings.setting.max_chairs_on_table}</p>
        </div>
    );
}

export default Settings;