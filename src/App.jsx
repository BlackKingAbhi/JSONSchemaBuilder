import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function App() {
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("string");

  const handleAddField = () => {
    if (!fieldName.trim()) return;
    setFields([...fields, { name: fieldName.trim(), type: fieldType }]);
    setFieldName("");
    setFieldType("string");
  };

  const generateSchema = () => {
    const schema = {
      type: "object",
      properties: {},
    };
    fields.forEach((field) => {
      schema.properties[field.name] = { type: field.type };
    });
    alert(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-4 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">JSON Schema Builder</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Field Name"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            />
            <select
              className="border rounded-md px-2 py-1"
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
            >
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="boolean">boolean</option>
              <option value="array">array</option>
              <option value="object">object</option>
            </select>
            <Button onClick={handleAddField}>Add Field</Button>
          </div>

          <div className="space-y-2">
            {fields.map((field, idx) => (
              <div key={idx} className="flex justify-between items-center border p-2 rounded">
                <span>{field.name} : {field.type}</span>
              </div>
            ))}
          </div>

          <Button onClick={generateSchema}>Generate JSON Schema</Button>
        </CardContent>
      </Card>
    </div>
  );
}