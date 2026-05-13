"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/react/components/ui/header";
import { Footer } from "@/react/components/ui/footer";
import { Card, CardContent, CardHeader } from "@/react/components/ui/card";
import { Button } from "@/react/components/ui/button";
import { Input } from "@/react/components/ui/input";
import { Label } from "@/react/components/ui/label";
import { Badge } from "@/react/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/react/components/ui/select";
import { X, Plus, Eye, PenLine, Upload, ImageIcon, Trash2 } from "lucide-react";
import { challengesApi, tagsApi, type ChallengeBody, type Tag, type ReadChallenge } from "@/lib/api";
import { BASE_URL } from "@/constants/api";

export default function AdminPage() {
    // ── Create challenge form ─────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [type, setType] = useState<"Frontend" | "Backend" | "Fullstack">("Frontend");
    const [difficulty, setDifficulty] = useState(5);
    const [isFree, setIsFree] = useState(true);
    const [description, setDescription] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [previewMode, setPreviewMode] = useState(false);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [tagSearch, setTagSearch] = useState("");
    const [creatingTag, setCreatingTag] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [success, setSuccess] = useState<{ id: number; name: string } | null>(null);

    // ── Photo management ──────────────────────────────────────────────────────
    const [photoId, setPhotoId] = useState("");
    const [photoChallenge, setPhotoChallenge] = useState<ReadChallenge | null>(null);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [photoError, setPhotoError] = useState<string | null>(null);
    const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        tagsApi.list().then((res) => {
            if (res.success && res.data) setAvailableTags(res.data);
        });
    }, []);

    // When a challenge is created, pre-fill the photo ID section
    useEffect(() => {
        if (success) setPhotoId(String(success.id));
    }, [success]);

    // ── Tag helpers ───────────────────────────────────────────────────────────
    const filteredTags = availableTags.filter(
        (t) =>
            t.name.toLowerCase().includes(tagSearch.toLowerCase()) &&
            !selectedTags.includes(t.name)
    );
    const canCreateTag =
        tagSearch.trim().length > 0 &&
        !availableTags.some((t) => t.name.toLowerCase() === tagSearch.trim().toLowerCase()) &&
        !selectedTags.includes(tagSearch.trim());

    function addTag(tagName: string) {
        setSelectedTags((prev) => [...prev, tagName]);
        setTagSearch("");
    }

    function removeTag(tagName: string) {
        setSelectedTags((prev) => prev.filter((t) => t !== tagName));
    }

    async function handleCreateTag() {
        const tagName = tagSearch.trim();
        if (!tagName) return;
        setCreatingTag(true);
        try {
            const res = await tagsApi.create(tagName);
            if (res.success && res.data) {
                setAvailableTags((prev) => [...prev, res.data!]);
                addTag(res.data.name);
            } else {
                setFormError(res.error?.message ?? "Не удалось создать тег");
            }
        } finally {
            setCreatingTag(false);
        }
    }

    async function handleSubmit() {
        if (!name.trim() || !description.trim()) {
            setFormError("Заполните название и краткое описание");
            return;
        }
        if (selectedTags.length === 0) {
            setFormError("Добавьте хотя бы один тег");
            return;
        }
        setFormError(null);
        setSubmitting(true);
        try {
            const body: ChallengeBody = {
                name: name.trim(),
                is_free: isFree,
                type,
                difficulty,
                description: description.trim(),
                task_description: taskDescription.trim(),
                image_url: "",
                tags: selectedTags,
            };
            const res = await challengesApi.create(body);
            if (!res.success || !res.data?.id) {
                setFormError(res.error?.message ?? "Ошибка при создании задачи");
                return;
            }
            setSuccess({ id: res.data.id, name: res.data.name });
            setName("");
            setDescription("");
            setTaskDescription("");
            setSelectedTags([]);
            setDifficulty(5);
            setIsFree(true);
            setType("Frontend");
        } finally {
            setSubmitting(false);
        }
    }

    // ── Photo management ──────────────────────────────────────────────────────
    async function handleLoadChallenge() {
        const id = parseInt(photoId, 10);
        if (isNaN(id)) { setPhotoError("Введите корректный ID"); return; }
        setPhotoLoading(true);
        setPhotoError(null);
        setPhotoChallenge(null);
        setPhotoSuccess(null);
        try {
            const res = await challengesApi.get(id);
            if (res.success && res.data) {
                setPhotoChallenge(res.data);
            } else {
                setPhotoError(res.error?.message ?? "Задача не найдена");
            }
        } finally {
            setPhotoLoading(false);
        }
    }

    async function handleUploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file || !photoChallenge?.id) return;
        setUploadLoading(true);
        setPhotoError(null);
        setPhotoSuccess(null);
        try {
            const res = await challengesApi.uploadImage(photoChallenge.id, file);
            if (res.success && res.data) {
                setPhotoChallenge(res.data);
                setPhotoSuccess("Изображение успешно загружено");
            } else {
                setPhotoError(res.error?.message ?? "Ошибка при загрузке изображения");
            }
        } finally {
            setUploadLoading(false);
            if (photoInputRef.current) photoInputRef.current.value = "";
        }
    }

    async function handleDeletePhoto() {
        if (!photoChallenge?.id) return;
        setDeleteLoading(true);
        setPhotoError(null);
        setPhotoSuccess(null);
        try {
            const res = await challengesApi.deleteImage(photoChallenge.id);
            if (res.success && res.data) {
                setPhotoChallenge(res.data);
                setPhotoSuccess("Изображение удалено");
            } else {
                setPhotoError(res.error?.message ?? "Ошибка при удалении изображения");
            }
        } finally {
            setDeleteLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-background-main">
            <Header />
            <main className="flex-1">
                <div className="px-16 py-12">
                    <h1 className="text-4xl font-[tektur] font-medium text-black mb-8">
                        Панель администратора — создание задачи
                    </h1>

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-xl flex items-center justify-between">
                            <p className="text-green-700 font-medium">
                                Задача «{success.name}» создана! ID: {success.id}
                                {" — "}
                                <a href={`/overview/${success.id}`} className="underline">открыть</a>.
                                Добавьте изображение в разделе ниже.
                            </p>
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setSuccess(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                        {/* Left column — form */}
                        <div className="flex flex-col gap-5">
                            <Card>
                                <CardHeader>
                                    <h2 className="text-xl font-[tektur] font-medium">Основная информация</h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Название *</Label>
                                        <Input
                                            placeholder="Тест скорости печати"
                                            className="bg-white border border-[#636363]"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <Label>Тип</Label>
                                            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                                                <SelectTrigger className="bg-white border border-[#636363]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Frontend">Frontend</SelectItem>
                                                    <SelectItem value="Backend">Backend</SelectItem>
                                                    <SelectItem value="Fullstack">Fullstack</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <Label>Сложность (1–10)</Label>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={10}
                                                className="bg-white border border-[#636363]"
                                                value={difficulty}
                                                onChange={(e) => setDifficulty(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    {/* Description (short) */}
                                    <div className="flex flex-col gap-1.5">
                                        <Label>Краткое описание * <span className="text-xs text-muted-foreground">(отображается в карточке)</span></Label>
                                        <Input
                                            placeholder="Реализуй интерактивный тест скорости печати с таймером и подсчётом ошибок"
                                            className="bg-white border border-[#636363]"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Label>Доступ:</Label>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsFree(true)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                                    isFree
                                                        ? "bg-primary-purple text-white border-primary-purple"
                                                        : "bg-white text-black border-gray-300 hover:border-primary-purple"
                                                }`}
                                            >
                                                Бесплатно
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsFree(false)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                                                    !isFree
                                                        ? "bg-primary-purple text-white border-primary-purple"
                                                        : "bg-white text-black border-gray-300 hover:border-primary-purple"
                                                }`}
                                            >
                                                По подписке
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <h2 className="text-xl font-[tektur] font-medium">Теги</h2>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <div className="flex flex-wrap gap-2 min-h-8">
                                        {selectedTags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="bg-primary-purple text-white border-primary-purple gap-1 pr-1"
                                            >
                                                {tag}
                                                <button onClick={() => removeTag(tag)} className="hover:opacity-70">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="Поиск или создание тега..."
                                            className="bg-white border border-[#636363]"
                                            value={tagSearch}
                                            onChange={(e) => setTagSearch(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    if (filteredTags.length > 0) addTag(filteredTags[0].name);
                                                    else if (canCreateTag) handleCreateTag();
                                                }
                                            }}
                                        />
                                        {tagSearch && (filteredTags.length > 0 || canCreateTag) && (
                                            <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-44 overflow-y-auto">
                                                {filteredTags.slice(0, 7).map((tag) => (
                                                    <button
                                                        key={tag.id}
                                                        onClick={() => addTag(tag.name)}
                                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                                                    >
                                                        <Plus className="h-3 w-3 text-primary-purple" />
                                                        {tag.name}
                                                    </button>
                                                ))}
                                                {canCreateTag && (
                                                    <button
                                                        onClick={handleCreateTag}
                                                        disabled={creatingTag}
                                                        className="w-full text-left px-3 py-2 hover:bg-primary-purple/10 text-sm flex items-center gap-2 text-primary-purple font-medium border-t border-gray-100"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        {creatingTag ? "Создание..." : `Создать тег «${tagSearch.trim()}»`}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Введите название тега и выберите из списка или нажмите «Создать тег».
                                    </p>
                                </CardContent>
                            </Card>

                            {formError && (
                                <p className="text-red-500 text-sm px-1">{formError}</p>
                            )}

                            <Button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-primary-purple border border-primary-purple hover:text-primary-purple hover:bg-white hover:cursor-pointer text-lg py-6"
                            >
                                {submitting ? "Создание..." : "Создать задачу"}
                            </Button>
                        </div>

                        {/* Right column — markdown editor */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-[tektur] font-medium">Техническое задание (Markdown)</h2>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode((v) => !v)}
                                    className="flex items-center gap-1.5 text-sm text-primary-purple hover:opacity-80 transition-opacity"
                                >
                                    {previewMode ? (
                                        <><PenLine className="h-4 w-4" /> Редактор</>
                                    ) : (
                                        <><Eye className="h-4 w-4" /> Превью</>
                                    )}
                                </button>
                            </div>
                            {previewMode ? (
                                <Card className="flex-1 min-h-[520px]">
                                    <CardContent className="pt-5 prose prose-sm max-w-none">
                                        {taskDescription ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {taskDescription}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="text-muted-foreground italic">Начните писать ТЗ для предпросмотра...</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ) : (
                                <textarea
                                    className="flex-1 min-h-[520px] w-full rounded-xl border border-[#636363] bg-white p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary-purple/40"
                                    placeholder={`# Название задачи\n\n## Описание\n\nОпишите задачу здесь...\n\n## Требования\n\n- Требование 1\n- Требование 2\n\n## Технический стек\n\n**Frontend:** React, TypeScript\n**Backend:** FastAPI`}
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            )}
                            <p className="text-xs text-muted-foreground">
                                Поддерживается GFM: заголовки, списки, таблицы, жирный/курсив, блоки кода, ссылки.
                            </p>
                        </div>
                    </div>

                    {/* ── Photo management section ─────────────────────────── */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-[tektur] font-medium text-black mb-4">
                            Управление изображением задачи
                        </h2>
                        <Card>
                            <CardContent className="pt-6 flex flex-col gap-5">
                                <div className="flex items-end gap-3">
                                    <div className="flex flex-col gap-1.5 w-48">
                                        <Label>ID задачи</Label>
                                        <Input
                                            type="number"
                                            placeholder="123"
                                            className="bg-white border border-[#636363]"
                                            value={photoId}
                                            onChange={(e) => setPhotoId(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleLoadChallenge()}
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={handleLoadChallenge}
                                        disabled={photoLoading}
                                        className="border-[#636363]"
                                    >
                                        {photoLoading ? "Загрузка..." : "Загрузить"}
                                    </Button>
                                </div>

                                {photoError && <p className="text-red-500 text-sm">{photoError}</p>}
                                {photoSuccess && <p className="text-green-600 text-sm">{photoSuccess}</p>}

                                {photoChallenge && (
                                    <div className="flex flex-col gap-4">
                                        <p className="text-sm font-medium text-muted-foreground">
                                            Задача: <span className="text-black">{photoChallenge.name}</span>
                                        </p>

                                        {photoChallenge.image_url ? (
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={`${BASE_URL}${photoChallenge.image_url}`}
                                                    alt="Текущее изображение"
                                                    className="w-48 h-32 object-cover rounded-xl border border-gray-200"
                                                />
                                                <div className="flex flex-col gap-2 justify-center">
                                                    <p className="text-sm text-muted-foreground">Текущее изображение</p>
                                                    <Button
                                                        variant="outline"
                                                        className="text-red-500 border-red-300 hover:bg-red-50 w-fit"
                                                        onClick={handleDeletePhoto}
                                                        disabled={deleteLoading}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1.5" />
                                                        {deleteLoading ? "Удаление..." : "Удалить изображение"}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-gray-300 text-muted-foreground text-sm">
                                                <ImageIcon className="h-5 w-5" />
                                                Изображение не загружено
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3">
                                            <label className="cursor-pointer">
                                                <input
                                                    ref={photoInputRef}
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                                    className="hidden"
                                                    onChange={handleUploadPhoto}
                                                    disabled={uploadLoading}
                                                />
                                                <span className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                                    uploadLoading
                                                        ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                                                        : "bg-primary-purple text-white border-primary-purple hover:bg-white hover:text-primary-purple cursor-pointer"
                                                }`}>
                                                    <Upload className="h-4 w-4" />
                                                    {uploadLoading ? "Загрузка..." : photoChallenge.image_url ? "Заменить изображение" : "Загрузить изображение"}
                                                </span>
                                            </label>
                                            <p className="text-xs text-muted-foreground">JPEG, PNG, WebP, GIF · до 10 МБ</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
