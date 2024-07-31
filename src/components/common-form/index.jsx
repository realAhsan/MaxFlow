import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import CommonButton from "../common-button";
import { Card, CardContent } from "../ui/card";
import { SelectValue } from "@radix-ui/react-select";

const CommonForm = ({ formControls = [], handleSubmit, form, btnText }) => {
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {formControls.length > 0
              ? formControls.map((ControlItem) => (
                  <FormField
                    key={ControlItem.id}
                    control={form.control}
                    name={ControlItem.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{ControlItem.label}</FormLabel>
                        {ControlItem.componentType === "input" ? (
                          <FormControl>
                            <Input
                              placeholder={ControlItem.placeholder}
                              type={ControlItem.type}
                              {...field}
                              value={field.value}
                              className="w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm transition-all duration-300 ease-in-out  focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                        ) : ControlItem.componentType === "select" ? (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full rounded h-[50px] border-none text-black bg-gray-200 text-[16px] outline-none drop-shadow-sm transition-all duration-300 ease-in-out  focus:bg-gray-100 focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                                {field.value ? (
                                  <SelectValue
                                    className="text-black focus:text-black"
                                    placeholder={ControlItem.placeholder}
                                  />
                                ) : (
                                  "select"
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ControlItem.options.map((optionItem) => (
                                <SelectItem
                                  key={optionItem.value}
                                  value={optionItem.id}
                                  className="text-black cursor-pointer focus:text-black"
                                >
                                  {optionItem.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : null}
                      </FormItem>
                    )}
                  />
                ))
              : null}
            <div className="flex justify-center mt-4 items-center">
              <CommonButton type={"submit"} text={btnText} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CommonForm;
