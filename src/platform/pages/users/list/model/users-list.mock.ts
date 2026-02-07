import type { Region } from '@/platform/entities/region'
import type { Role } from '@/platform/entities/role'
import type { Status } from '@/platform/entities/status'
import type { User } from '@/platform/entities/user'

const roles: Role[] = [
	{ id: 1, sysname: 'admin', name: 'Администратор' },
	{ id: 2, sysname: 'manager', name: 'Менеджер' },
	{ id: 3, sysname: 'editor', name: 'Редактор' },
	{ id: 4, sysname: 'viewer', name: 'Наблюдатель' }
]

const statuses: Status[] = [
	{ id: 1, sysname: 'active', name: 'Активен', priority: 1, desc: 'Активный' },
	{ id: 2, sysname: 'invited', name: 'Приглашен', priority: 2, desc: 'Ожидает вход' },
	{ id: 3, sysname: 'pending', name: 'Ожидает', priority: 3, desc: 'На проверке' },
	{ id: 4, sysname: 'blocked', name: 'Заблокирован', priority: 4, desc: 'Доступ закрыт' }
]

const regions: Region[] = [
	{ id: 1, sysname: 'moscow', name: 'Москва', parent_id: 0 },
	{ id: 2, sysname: 'spb', name: 'Санкт-Петербург', parent_id: 0 },
	{ id: 3, sysname: 'kazan', name: 'Казань', parent_id: 0 },
	{ id: 4, sysname: 'remote', name: 'Удаленно', parent_id: 0 }
]

const mockUsers: User[] = [
	{
		id: 1001,
		lastname: 'Иванов',
		firstname: 'Иван',
		patronymic: 'Андреевич',
		email: 'ivanov@demo.local',
		telegram_username: 'ivanov',
		phone: '+7 900 000-00-01',
		created_at: '2026-01-12T09:00:00Z',
		region: regions[0],
		role: roles[0],
		status: statuses[0]
	},
	{
		id: 1002,
		lastname: 'Петрова',
		firstname: 'Анна',
		patronymic: 'Сергеевна',
		email: 'apetrova@demo.local',
		telegram_username: 'apetrova',
		phone: '+7 900 000-00-02',
		created_at: '2026-01-13T11:20:00Z',
		region: regions[1],
		role: roles[1],
		status: statuses[1]
	},
	{
		id: 1003,
		lastname: 'Сидоров',
		firstname: 'Дмитрий',
		patronymic: 'Игоревич',
		email: 'sidorov@demo.local',
		telegram_username: 'sidorov',
		phone: '+7 900 000-00-03',
		created_at: '2026-01-15T08:10:00Z',
		region: regions[2],
		role: roles[2],
		status: statuses[0]
	},
	{
		id: 1004,
		lastname: 'Николаева',
		firstname: 'Марина',
		patronymic: 'Олеговна',
		email: 'nikolaeva@demo.local',
		telegram_username: 'nikolaeva',
		phone: '+7 900 000-00-04',
		created_at: '2026-01-16T14:40:00Z',
		region: regions[3],
		role: roles[3],
		status: statuses[2]
	},
	{
		id: 1005,
		lastname: 'Смирнов',
		firstname: 'Алексей',
		patronymic: 'Денисович',
		email: 'smirnov@demo.local',
		telegram_username: 'smirnov',
		phone: '+7 900 000-00-05',
		created_at: '2026-01-17T10:05:00Z',
		region: regions[0],
		role: roles[1],
		status: statuses[0]
	},
	{
		id: 1006,
		lastname: 'Орлова',
		firstname: 'Полина',
		patronymic: 'Михайловна',
		email: 'orlova@demo.local',
		telegram_username: 'orlova',
		phone: '+7 900 000-00-06',
		created_at: '2026-01-18T16:30:00Z',
		region: regions[1],
		role: roles[2],
		status: statuses[1]
	},
	{
		id: 1007,
		lastname: 'Козлов',
		firstname: 'Роман',
		patronymic: 'Евгеньевич',
		email: 'kozlov@demo.local',
		telegram_username: 'kozlov',
		phone: '+7 900 000-00-07',
		created_at: '2026-01-20T09:50:00Z',
		region: regions[2],
		role: roles[0],
		status: statuses[3]
	},
	{
		id: 1008,
		lastname: 'Федорова',
		firstname: 'Екатерина',
		patronymic: 'Павловна',
		email: 'fedorova@demo.local',
		telegram_username: 'fedorova',
		phone: '+7 900 000-00-08',
		created_at: '2026-01-21T12:15:00Z',
		region: regions[3],
		role: roles[3],
		status: statuses[0]
	},
	{
		id: 1009,
		lastname: 'Морозов',
		firstname: 'Егор',
		patronymic: 'Алексеевич',
		email: 'morozov@demo.local',
		telegram_username: 'morozov',
		phone: '+7 900 000-00-09',
		created_at: '2026-01-22T09:35:00Z',
		region: regions[0],
		role: roles[2],
		status: statuses[2]
	},
	{
		id: 1010,
		lastname: 'Волкова',
		firstname: 'Виктория',
		patronymic: 'Александровна',
		email: 'volkova@demo.local',
		telegram_username: 'volkova',
		phone: '+7 900 000-00-10',
		created_at: '2026-01-23T18:05:00Z',
		region: regions[1],
		role: roles[1],
		status: statuses[0]
	},
	{
		id: 1011,
		lastname: 'Попов',
		firstname: 'Никита',
		patronymic: 'Дмитриевич',
		email: 'popov@demo.local',
		telegram_username: 'popov',
		phone: '+7 900 000-00-11',
		created_at: '2026-01-24T08:25:00Z',
		region: regions[2],
		role: roles[3],
		status: statuses[1]
	},
	{
		id: 1012,
		lastname: 'Кузнецова',
		firstname: 'Ольга',
		patronymic: 'Ильинична',
		email: 'kuznetsova@demo.local',
		telegram_username: 'kuznetsova',
		phone: '+7 900 000-00-12',
		created_at: '2026-01-25T13:40:00Z',
		region: regions[3],
		role: roles[2],
		status: statuses[0]
	},
	{
		id: 1013,
		lastname: 'Зайцев',
		firstname: 'Павел',
		patronymic: 'Артемович',
		email: 'zaitsev@demo.local',
		telegram_username: 'zaitsev',
		phone: '+7 900 000-00-13',
		created_at: '2026-01-26T15:00:00Z',
		region: regions[0],
		role: roles[1],
		status: statuses[2]
	},
	{
		id: 1014,
		lastname: 'Белова',
		firstname: 'Дарья',
		patronymic: 'Ильинична',
		email: 'belova@demo.local',
		telegram_username: 'belova',
		phone: '+7 900 000-00-14',
		created_at: '2026-01-27T10:30:00Z',
		region: regions[1],
		role: roles[0],
		status: statuses[0]
	},
	{
		id: 1015,
		lastname: 'Громов',
		firstname: 'Артем',
		patronymic: 'Сергеевич',
		email: 'gromov@demo.local',
		telegram_username: 'gromov',
		phone: '+7 900 000-00-15',
		created_at: '2026-01-28T09:10:00Z',
		region: regions[2],
		role: roles[1],
		status: statuses[0]
	},
	{
		id: 1016,
		lastname: 'Крылова',
		firstname: 'София',
		patronymic: 'Никитична',
		email: 'krylova@demo.local',
		telegram_username: 'krylova',
		phone: '+7 900 000-00-16',
		created_at: '2026-01-28T16:55:00Z',
		region: regions[3],
		role: roles[3],
		status: statuses[1]
	},
	{
		id: 1017,
		lastname: 'Ершов',
		firstname: 'Максим',
		patronymic: 'Петрович',
		email: 'ershov@demo.local',
		telegram_username: 'ershov',
		phone: '+7 900 000-00-17',
		created_at: '2026-01-29T12:40:00Z',
		region: regions[0],
		role: roles[2],
		status: statuses[2]
	},
	{
		id: 1018,
		lastname: 'Тихонова',
		firstname: 'Алина',
		patronymic: 'Романовна',
		email: 'tikhonova@demo.local',
		telegram_username: 'tikhonova',
		phone: '+7 900 000-00-18',
		created_at: '2026-01-30T10:25:00Z',
		region: regions[1],
		role: roles[1],
		status: statuses[0]
	},
	{
		id: 1019,
		lastname: 'Савельев',
		firstname: 'Кирилл',
		patronymic: 'Олегович',
		email: 'saveliev@demo.local',
		telegram_username: 'saveliev',
		phone: '+7 900 000-00-19',
		created_at: '2026-01-31T18:10:00Z',
		region: regions[2],
		role: roles[0],
		status: statuses[3]
	},
	{
		id: 1020,
		lastname: 'Сергеева',
		firstname: 'Нина',
		patronymic: 'Викторовна',
		email: 'sergeeva@demo.local',
		telegram_username: 'sergeeva',
		phone: '+7 900 000-00-20',
		created_at: '2026-02-01T09:55:00Z',
		region: regions[3],
		role: roles[2],
		status: statuses[1]
	},
	{
		id: 1021,
		lastname: 'Фролов',
		firstname: 'Илья',
		patronymic: 'Андреевич',
		email: 'frolov@demo.local',
		telegram_username: 'frolov',
		phone: '+7 900 000-00-21',
		created_at: '2026-02-01T14:30:00Z',
		region: regions[0],
		role: roles[1],
		status: statuses[0]
	},
	{
		id: 1022,
		lastname: 'Мельникова',
		firstname: 'Елена',
		patronymic: 'Юрьевна',
		email: 'melnikova@demo.local',
		telegram_username: 'melnikova',
		phone: '+7 900 000-00-22',
		created_at: '2026-02-02T11:05:00Z',
		region: regions[1],
		role: roles[3],
		status: statuses[2]
	},
	{
		id: 1023,
		lastname: 'Лебедев',
		firstname: 'Тимур',
		patronymic: 'Рафаэлевич',
		email: 'lebedev@demo.local',
		telegram_username: 'lebedev',
		phone: '+7 900 000-00-23',
		created_at: '2026-02-03T13:15:00Z',
		region: regions[2],
		role: roles[0],
		status: statuses[0]
	},
	{
		id: 1024,
		lastname: 'Жукова',
		firstname: 'Ксения',
		patronymic: 'Владиславовна',
		email: 'zhukova@demo.local',
		telegram_username: 'zhukova',
		phone: '+7 900 000-00-24',
		created_at: '2026-02-04T16:20:00Z',
		region: regions[3],
		role: roles[2],
		status: statuses[1]
	}
]

export { mockUsers, regions as userRegions, roles as userRoles, statuses as userStatuses }
