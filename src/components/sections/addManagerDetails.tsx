"use client";

import { useEffect, useState } from "react";
import DeleteIcon from "@/icons/deleteIcon";
import EditIcon from "@/icons/editIcon";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteManager, fetchManagers } from "@/redux/slices/managerSlice";
import SkeletonManagerCard from "../common/SkeletonManagerCard";
import Button from "../common/button";
import CustomMultiSearchSelect from "../common/CustomSelectSearch/MultiSelectOption";
import { OptionType } from "../common/CustomSelectSearch/SelectOption";

type Manager = {
  id: string;
  full_name: string;
  profileImage?: string;
  email: string;
  user_farms: string[];
};
const availableFarms: OptionType[] = [
  { label: "Dipak Farm", value: "Dipak Farm" },
  { label: "Matt Green Farm", value: "Matt Green Farm" },
  { label: "Tyler Farm", value: "Tyler Farm" },
];
export default function AddManagerDetails() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [managers, setManagers] = useState<Manager[]>([]);
  const [editManagerId, setEditManagerId] = useState<string | null>(null);
  const [editFarms, setEditFarms] = useState<string[]>([]);
  const [deleteManagerId, setDeleteManagerId] = useState<Manager | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getManagers = async () => {
      try {
        const response = await dispatch(fetchManagers());
        const { data } = response.payload as { data: Manager[] };
        setManagers(data);
      } catch (error) {
        console.error("Failed to fetch managers:", error);
      } finally {
        setLoading(false);
      }
    };

    getManagers();
  }, [dispatch]);
  console.log("data", managers);

  const handleDeleteManager = async (id: string) => {
    try {
      const response = await dispatch(deleteManager(id));
      console.log('response', response)
      if (response.meta.requestStatus === "fulfilled") {
        setManagers((prev) => prev.filter((manager) => manager.id !== id));
        setShowDeleteModal(false);
        setDeleteManagerId(null);
        console.log("Manager deleted successfully");
      } else {
        console.error("Failed to delete manager:", response.payload);
      }
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  return (
    <>
      <div className="p-5">
        {loading ? (
          <div className="">
            <SkeletonManagerCard />
            <SkeletonManagerCard />
            <SkeletonManagerCard />
          </div>
        ) : (
          <>
            {managers.map((manager, i) => {
              return (
                <div
                  className="bg-white shadow-xl px-3 py-4 rounded-lg mb-4 last:mb-0"
                  key={i}
                >
                  <div className="grid grid-cols-[50px_1fr_20px] items-center gap-3">
                    {manager.profileImage ? (
                      <img
                        className="w-full h-full rounded-full block object-cover"
                        src={manager?.profileImage}
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-primary text-white font-medium text-xl">
                        {manager.full_name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-black font-medium">
                        {manager.full_name}
                      </p>
                      <a className="text-xs font-medium text-gray800 block pb-0.5">
                        {manager.email}
                      </a>
                      <span className="text-xs font-medium text-gray800 block">
                        {manager.user_farms.length} Farm Assigned
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setEditManagerId(manager.id);
                          setEditFarms(manager.user_farms); // Assuming this is an array of farm IDs (strings)
                          setShowEditModal(true);
                        }}
                      >
                        <EditIcon />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setDeleteManagerId(manager);
                          setShowDeleteModal(true);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
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
                  const selectedValues = selectedOptions.map(
                    (opt) => opt.value
                  );
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
                            ? { ...m, user_farms: editFarms }
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
        {showDeleteModal && deleteManagerId && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-center text-red-600">
                Confirm Deletion
              </h2>
              <p className="text-sm text-center text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteManagerId.full_name}</strong>?
              </p>
              <div className="flex justify-between">
                <Button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteManagerId(null);
                  }}
                  buttonClass="border border-gray-400 text-gray-700 px-4 py-2 rounded w-full mr-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => handleDeleteManager(deleteManagerId.id)}
                  green
                  buttonClass="bg-red-600 text-white px-4 py-2 rounded w-full ml-2"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="fixed z-[999] right-4 bottom-24 bg-primary flex items-center justify-center text-white rounded-full w-10 h-10"
        onClick={() => router.push("/add-managers")}
      >
        <Plus className="h-4 w-4" />
      </div>
    </>
  );
}
