import React from 'react';
import './AdditionalFields.js';

function AdditionalFields() {
  return (
    <div className="additional-fields">
      <h2>Additional Fields</h2>
      <form>
        {/* Optional Field 1 */}
        <div className="form-group">
          <label htmlFor="optionalField1">Optional Field 1:</label>
          <input type="text" id="optionalField1" name="optionalField1" />
        </div>

        {/* Optional Field 2 */}
        <div className="form-group">
          <label htmlFor="optionalField2">Optional Field 2:</label>
          <input type="text" id="optionalField2" name="optionalField2" />
        </div>

        {/* Optional Field 3 */}
        <div className="form-group">
          <label htmlFor="optionalField3">Optional Field 3:</label>
          <input type="text" id="optionalField3" name="optionalField3" />
        </div>

        {/* Optional Field 4 */}
        <div className="form-group">
          <label htmlFor="optionalField4">Optional Field 4:</label>
          <input type="text" id="optionalField4" name="optionalField4" />
        </div>

        {/* Optional Field 5 */}
        <div className="form-group">
          <label htmlFor="optionalField5">Optional Field 5:</label>
          <input type="text" id="optionalField5" name="optionalField5" />
        </div>

        {/* Optional Field 6 */}
        <div className="form-group">
          <label htmlFor="optionalField6">Optional Field 6:</label>
          <input type="text" id="optionalField6" name="optionalField6" />
        </div>

        {/* Optional Field 7 */}
        <div className="form-group">
          <label htmlFor="optionalField7">Optional Field 7:</label>
          <input type="text" id="optionalField7" name="optionalField7" />
        </div>

        {/* Optional Field 8 */}
        <div className="form-group">
          <label htmlFor="optionalField8">Optional Field 8:</label>
          <input type="text" id="optionalField8" name="optionalField8" />
        </div>

        {/* Date Input Field (Optional) */}
        <div className="form-group">
          <label htmlFor="dateField">Date Field (Optional):</label>
          <input type="date" id="dateField" name="dateField" />
        </div>

        {/* Photo Upload Field (Optional) */}
        <div className="form-group">
          <label htmlFor="photoField">Photo Upload (Optional):</label>
          <input type="file" id="photoField" name="photoField" accept="image/*" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdditionalFields;
