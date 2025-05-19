"use client";

import { useState } from "react";
import Button from "../common/button";
import CustomSearchSelect, {
  OptionType,
} from "../common/CustomSelectSearch/SelectOption";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { managerValidationSchema } from "../utils/validations/managerValidation";
import { Users } from "lucide-react";
import CustomMultiSearchSelect from "../common/CustomSelectSearch/MultiSelectOption";
const ManageProfile = "/icons/manage-profile.svg";

type Manager = {
  id: number;
  name: string;
  email: string;
  assignedFarms: string[];
};

const availableFarms: OptionType[] = [
  { label: "Dipak Farm", value: "Dipak Farm" },
  { label: "Matt Green Farm", value: "Matt Green Farm" },
  { label: "Tyler Farm", value: "Tyler Farm" },
];

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editManagerId, setEditManagerId] = useState<number | null>(null);
  const [editFarms, setEditFarms] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState<{
    name: string;
    email: string;
    farm: string[]; // 👈 changed to array
  }>({
    name: "",
    email: "",
    farm: [],
  });

  const handleAddManager = (data: any) => {
    console.log("data", data);
    const newManager: Manager = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      assignedFarms: data.farm,
    };
    setManagers([...managers, newManager]);
    setForm({ name: "", email: "", farm: [] });

    setShowModal(false);
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(managerValidationSchema), // Connect Yup validation
    defaultValues: {
      name: "",
      email: "",
      farm: [], // 👈 array
    },
  });
  const deleteManager = (id: number) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white relative md:max-w-[375px] md:mx-auto">
      <div className="h-[calc(100dvh-68px)] flex items-center justify-center px-5">
        {managers.length > 0 ? (
          <div className="space-y-3">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className="bg-gray-100 p-4 rounded-xl shadow-cardShadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {manager?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-base truncate max-w-[250px]">
                      {manager?.name}
                    </div>
                    <div className="text-sm text-gray-600 truncate max-w-[250px]">
                      {manager?.email}
                    </div>
                    <div className="text-sm text-gray-600">
                      {manager.assignedFarms.length} Farm
                      {manager.assignedFarms.length !== 1 ? "s" : ""} Assigned
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditManagerId(manager.id);
                      setEditFarms(manager.assignedFarms);
                      setShowEditModal(true);
                    }}
                    className="text-primary text-sm border border-primary rounded px-3 py-1 hover:bg-[#d2ffeb] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteManager(manager.id)}
                    className="text-red-600 text-sm border border-red-300 rounded px-3 py-1 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white w-full border border-solid border-borderColorlight500 py-8 px-4 rounded-xl shadow-cardShadowLight">
            <div className="flex items-center justify-center pb-5">
              <img src={ManageProfile} alt="ManageProfile" />
            </div>
            <h3 className="text-lg text-black font-semibold text-center mb-2.5">
              No Managers Found
            </h3>
            <p className="text-xs text-black text-center max-w-[250px] mx-auto">
              You haven’t added any farm managers yet. Add your first manager to
              get started.
            </p>
            <div className="pt-7">
              <Button
                onClick={() => setShowModal(true)}
                buttonClass="flex items-center justify-center gap-3 !p-3"
                green
              >
                ➕ Add Manager
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Manager Button */}
      {managers.length > 0 && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[9] max-w-[380px] w-full mx-auto">
          <Button
            onClick={() => setShowModal(true)}
            buttonClass="flex items-center justify-center gap-3"
            green
          >
            ➕ Add Manager
          </Button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white w-[90%] p-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-green-700 mb-3">
              Add New Manager
            </h2>
            <form onSubmit={handleSubmit(handleAddManager)}>
              <div className="pb-[18px]">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={watch("name")}
                  {...register("name", {
                    onChange: (e) => setValue("name", e.target.value),
                  })}
                  error={errors.name?.message} // Pass the error for username
                />
              </div>

              <div className="pb-[18px]">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={watch("email")}
                  {...register("email", {
                    onChange: (e) => setValue("email", e.target.value),
                  })}
                  error={errors.email?.message} // Pass the error for username
                />
              </div>

              <div className="mb-4">
                <CustomMultiSearchSelect
                  label="Assign Farm"
                  options={availableFarms}
                  placeholder="Select farm(s)"
                  isSearchable={true}
                  value={
                    form.farm
                      .map((v) => availableFarms.find((opt) => opt.value === v))
                      .filter(Boolean) as OptionType[]
                  }
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions.map(
                      (opt) => opt.value
                    );
                    setForm({ ...form, farm: selectedValues });
                    setValue("farm", selectedValues);
                  }}
                />
                {errors.farm && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.farm.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between mt-4  h-[50px] max-w-full sm:w-[180px] sm:h-[50px]">
                <Button
                  onClick={() => setShowModal(false)}
                  buttonClass="text-gray border border-gray-400 px-4 py-1 rounded w-full h-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  green
                  buttonClass="bg-primary text-white px-4 py-1 rounded w-full h-full ml-2"
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-md p-5 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              Edit Assigned Farms
            </h2>

            <CustomMultiSearchSelect
              label="Update Farms"
              options={availableFarms}
              placeholder="Select farm(s)"
              isSearchable={true}
              value={
                editFarms
                  .map((v) => availableFarms.find((opt) => opt.value === v))
                  .filter(Boolean) as OptionType[]
              }
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map((opt) => opt.value);
                setEditFarms(selectedValues);
              }}
            />

            <div className="flex justify-between mt-4 h-[50px] max-w-full sm:w-[180px] sm:h-[50px]">
              <Button
                onClick={() => setShowEditModal(false)}
                buttonClass="text-gray border border-gray-400 px-4 py-1 rounded w-full h-full"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (editManagerId !== null) {
                    setManagers((prev) =>
                      prev.map((m) =>
                        m.id === editManagerId
                          ? { ...m, assignedFarms: editFarms }
                          : m
                      )
                    );
                  }
                  setShowEditModal(false);
                  setEditManagerId(null);
                  setEditFarms([]);
                }}
                green
                buttonClass="bg-primary text-white px-4 py-1 rounded w-full h-full ml-2"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
