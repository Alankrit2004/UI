export const ErrorConstant = {
    default: "Something went wrong",
};

export const LoginState = {
    init: "init",
    processing: "processing",
    error: "error",
    success: "success",
};
export const CommonConstant = {
    defaultPageSize: 10,
    mode: process.env.REACT_APP_MODE,
};

export const StorageConstant = {
    token: "token",
    user: "user",
    state: "state",
};

export const AcceptFileType = {
    image: {
        "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    video: {
        "video/*": [".mp4", ".webm", ".wav", ".mp3", ".ogg", ".glb", ".gltf", ".mov"],
    },
    imageVideo: {
        "image/*": [".jpeg", ".png", ".jpg", ".gif", ".mp4", ".webm", ".wav", ".mov", ".mp3", ".ogg", ".glb", ".gltf"],
    },
};

export const QueryNames = {
    redistribute: "redistibutionticket",
};


export const PaginationType = {
    all: "all",
    default: "",
};

export const FormModes = {
    Add: "Add",
    Edit: "Edit",
    View: "View",
};

export const ToastMode = {
    Success: "success",
    Error: "error",
};

export const UserMode = {
    Web: "W",
    Mobile: "M",
};
